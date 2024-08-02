import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { Role, Session, User } from '@prisma/client';
import { RolesService } from '../roles/roles.service';
import AllConfigType from 'src/config';
import { PrismaService } from 'nestjs-prisma';
import { JwtRefreshPayloadType } from './strategy/types/jwt-refresh-payload.type';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayloadType } from './strategy/types/jwt-payload.type';
import { NullableType } from 'src/utils/types/nullable';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private roleService: RolesService,
    private configService: ConfigService<AllConfigType>,
    protected databaseService: PrismaService,
  ) {}

  async signIn(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneOrFailByEmail(loginDto.email);

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const role = await this.roleService.getUserRoles(user.id);

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

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

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

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

  async me(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
    return await this.userService.findOne(userJwtPayload.id);
  }

  private async getTokensData(data: {
    id: User['id'];
    role: Role['name'];
    sessionId: Session['id'];
    hash: Session['hash'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires_time', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret_key', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return await this.sessionService.deleteById(data.sessionId);
  }
}
