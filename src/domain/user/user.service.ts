import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'nestjs-prisma';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { RoleEnum } from '../roles/roles.enum';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  Prisma.UserWhereInput,
  Prisma.UserSelect,
  Prisma.UserInclude
> {
  private readonly validIncludeKeys: (keyof Prisma.UserInclude)[] = [
    'role',
    'followers',
    'followers',
  ];

  constructor(
    databaseService: PrismaService,
    private rolesService: RolesService,
  ) {
    super(databaseService, 'User');
  }

  async createWithHash(data: Prisma.UserCreateInput) {
    const hashedPassword = await this.hashPassword(data.password);

    const userData = {
      email: data.email,
      password: hashedPassword,
      username: data.username,
    };

    const user = await this.create(userData);

    await this.rolesService.assignRoleToUser(user.id, RoleEnum.user);

    return user;
  }

  async findAll() {
    return await this.findWithPagination({});
  }

  async findOneOrFail(id: number) {
    return await this.findOrFailById(+id);
  }

  async findOne(id: number) {
    return await this.findById(+id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.updateOrFailById(id, updateUserDto);
  }

  async findOneOrFailByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
