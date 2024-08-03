import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { RoleEnum } from '../roles/roles.enum';
import { RolesService } from '../roles/roles.service';
import { BcryptService } from 'src/core/service/bcrypt.service';

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
    protected databaseService: PrismaService,
    private rolesService: RolesService,
    private bcryptService: BcryptService,
  ) {
    super(databaseService, 'User');
  }

  async createWithHash(data: Prisma.UserCreateInput) {
    const hashedPassword = await this.bcryptService.hash(data.password);

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
}
