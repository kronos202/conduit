import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { RolesService } from '../roles/roles.service';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { UploadService } from 'src/upload/upload.service';

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
    private uploadService: UploadService,
  ) {
    super(databaseService, 'User');
  }

  async createWithHash(
    data: Prisma.UserCreateInput,
    file?: Express.Multer.File,
  ) {
    console.log(file);

    const hashedPassword = await this.bcryptService.hash(data.password);
    let avatarUrl: string = 'https://api.realworld.io/images/smiley-cyrus.jpeg';

    if (file) {
      const uploadResult = await this.uploadService.uploadFile(file);
      avatarUrl = uploadResult.secure_url;
    }

    const userData: Prisma.UserCreateInput = {
      email: data.email,
      password: hashedPassword,
      username: data.username,
      avatar: avatarUrl,
    };

    const user = await this.create(userData);

    await this.rolesService.assignRoleToUser(user.id, 'user');

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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    let avatarUrl: string;
    if (file) {
      const uploadResult = await this.uploadService.uploadFile(file);
      avatarUrl = uploadResult.secure_url;
    }
    return await this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        avatar: avatarUrl,
      },
    });
  }

  async findOneOrFailByEmail(emailS: string) {
    return await this.databaseService.user.findUnique({
      where: { email: emailS },
    });
  }
}
