import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/core/service/base.service';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { MailService } from 'src/mail/mail.service';
import { AuthProvidersEnum } from 'src/core/enums/auth-provider.enum';
import { RoleEnum } from 'src/core/enums/roles.enum';
import { NullableType } from 'src/utils/types/nullable';

@Injectable()
export class UserService extends BaseService<
  CreateUserDto,
  UpdateUserDto,
  Prisma.UserWhereInput,
  Prisma.UserSelect,
  Prisma.UserInclude
> {
  constructor(
    protected databaseService: PrismaService,
    private bcryptService: BcryptService,
    private mailService: MailService,
  ) {
    super(databaseService, 'User');
  }

  async createWithHash(createProfileDto: CreateUserDto) {
    try {
      const clonedPayload: Prisma.UserCreateInput = {
        provider: AuthProvidersEnum.email,
        ...createProfileDto,
        role: {
          connect: {
            id: RoleEnum.user,
          },
        },
      };

      if (clonedPayload.password) {
        clonedPayload.password = await this.bcryptService.hash(
          createProfileDto.password,
        );
      }

      const user = await this.create(clonedPayload);

      return user;
    } catch (error) {
      throw error;
    }
  }

  findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>> {
    return this.databaseService.user.findFirst({
      where: {
        socialId,
        provider,
      },
    });
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
    return await this.databaseService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async findOneOrFailByEmail(emailS: string) {
    return await this.databaseService.user.findUnique({
      where: { email: emailS },
    });
  }

  async testsendmail() {
    return await this.mailService.userSignUp({
      to: 'kronosss200202@gmail.com',
      data: {
        hash: 'mascaramascaramascaramascaramascar',
      },
    });
  }
}
