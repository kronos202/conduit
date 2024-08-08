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
    try {
      const hashedPassword = await this.bcryptService.hash(data.password);
      let avatarUrl: string =
        'https://api.realworld.io/images/smiley-cyrus.jpeg';

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
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.findWithPagination({});
  }

  async findOneOrFail(id: number) {
    return await this.findOrFailById(+id);
  }

  async findOne(id: number) {
    return await this.databaseService.user.findUnique({
      where: {
        id,
      },
      include: {
        followers: true,
        following: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const avatarUrl: string = `data:image/jpeg;base64,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`;
    // if (file) {
    //   const uploadResult = await this.uploadService.uploadFile(file);
    //   avatarUrl = uploadResult.secure_url;
    // }

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
