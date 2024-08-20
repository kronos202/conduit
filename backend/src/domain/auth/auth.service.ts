import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';

import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { UserService } from '../users/user.service';
import { SessionService } from '../sessions/session.service';
import { Prisma, Role, Session, User } from '@prisma/client';
import { RolesService } from '../roles/roles.service';
import AllConfigType from 'src/config';
import { PrismaService } from 'nestjs-prisma';
import { JwtRefreshPayloadType } from './strategy/types/jwt-refresh-payload.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayloadType } from './strategy/types/jwt-payload.type';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { MailService } from 'src/mail/mail.service';
import { SocialInterface } from 'src/auth-google/interfaces/social.interface';
import { NullableType } from 'src/utils/types/nullable';
import { RoleEnum } from 'src/core/enums/roles.enum';
import { getConfig } from 'src/utils/helpers/getConfig';

@Injectable()
export class AuthService {
  private config = getConfig(this.configService);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private roleService: RolesService,
    private configService: ConfigService<AllConfigType>,
    protected databaseService: PrismaService,
    private bcryptService: BcryptService,
    private mailService: MailService,
  ) {}

  async signIn(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneOrFailByEmail(loginDto.email);

    const isValidPassword = await this.bcryptService.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          message:
            'Có lỗi xảy ra khi đăng nhập. Hãy kiểm tra lại tài khoản hoặc mật khẩu',
        },
      });
    }

    const role = await this.roleService.getUserRoles(user.id);

    const hash = await this.bcryptService.genSha256();

    const session = await this.sessionService.create({
      userId: user.id,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: role.role.map((name) => name.id).toString(),
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async register(dto: AuthRegisterLoginDto) {
    const user = await this.userService.createWithHash({
      ...dto,
      email: dto.email,
    });

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.config.auth.confirmEmailSecret,
        expiresIn: this.config.auth.confirmEmailExpires,
      },
    );

    return await this.mailService.userSignUp({
      to: dto.email,
      data: {
        hash,
      },
    });
  }

  async confirmEmail(hash: string): Promise<void> {
    let userId: User['id'];

    try {
      const jwtData = await this.jwtService.verifyAsync<{
        confirmEmailUserId: User['id'];
      }>(hash, {
        secret: this.config.auth.confirmEmailSecret,
      });

      userId = jwtData.confirmEmailUserId;
    } catch {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          hash: `invalidHash`,
        },
      });
    }

    const user = await this.userService.findById({ id: userId });

    if (!user || user?.active !== false) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: `notFound`,
      });
    }

    user.active = true;

    await this.userService.updateUser(user.id, user);
  }

  async validateSocialLogin(
    authProvider: string,
    socialData: SocialInterface,
  ): Promise<LoginResponseDto> {
    let user: NullableType<User> = null;
    const socialEmail = socialData.email?.toLowerCase();
    let userByEmail: NullableType<User> = null;

    if (socialEmail) {
      userByEmail = await this.userService.findOneOrFailByEmail(socialEmail);
    }

    if (socialData.id) {
      user = await this.userService.findBySocialIdAndProvider({
        socialId: socialData.id,
        provider: authProvider,
      });
    }

    if (user) {
      if (socialEmail && !userByEmail) {
        user.email = socialEmail;
      }
      await this.userService.updateUser(user.id, user);
    } else if (userByEmail) {
      user = userByEmail;
    } else if (socialData.id) {
      const createData: Prisma.UserCreateInput = {
        role: {
          connect: {
            id: RoleEnum.user,
          },
        },
        email: socialEmail ?? '',
        username: socialData.firstName + socialData.lastName ?? '',
        provider: authProvider,
      };

      user = await this.userService.createWithHash(createData);

      user = await this.userService.findById({ id: user.id });
    }

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'userNotFound',
        },
      });
    }

    const hash = await this.bcryptService.genSha256();

    const session = await this.sessionService.create({
      userId: user.id,
      hash,
    });

    const roles = await this.roleService.getUserRoles(session.userId);

    const {
      token: jwtToken,
      refreshToken,
      tokenExpires,
    } = await this.getTokensData({
      id: user.id,
      role: roles.role.map((name) => name.id).toString(),
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token: jwtToken,
      tokenExpires,
      user,
    };
  }
  async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
  ): Promise<Omit<LoginResponseDto, 'user'>> {
    const session = await this.sessionService.findOne(data.sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.hash !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = await this.bcryptService.genSha256();

    const roles = await this.roleService.getUserRoles(session.userId);

    if (!roles) {
      throw new UnauthorizedException();
    }

    await this.sessionService.update(session.id, {
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.userId,
      role: roles.role.map((name) => name.id).toString(),
      sessionId: session.id,
      hash,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async me(userJwtPayload: JwtPayloadType) {
    return await this.databaseService.user.findFirst({
      where: {
        id: userJwtPayload.id,
      },
      include: {
        followers: true,
        following: true,
      },
    });
  }

  private async getTokensData(data: {
    id: User['id'];
    role: Role['name'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.config.auth.expires_time;

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.config.auth.secret_key,
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.config.auth.refreshSecret,
          expiresIn: this.config.auth.refreshExpires,
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneOrFailByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isMatch = this.bcryptService.compare(password, user.password);
    if (!isMatch) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          message:
            'Có lỗi xảy ra khi đăng nhập. Hãy kiểm tra lại tài khoản hoặc mật khẩu',
        },
      });
    }
    return user;
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return await this.sessionService.deleteById(data.sessionId);
  }
}
