import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { UserService } from '../users/user.service';
import { RoleModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { SessionModule } from '../sessions/session.module';
import { SessionService } from '../sessions/session.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { UploadModule } from 'src/upload/upload.module';
import { LocalStrategy } from './strategy/local.strategy';
import { MailService } from 'src/mail/mail.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [
    UserModule,
    RoleModule,
    SessionModule,
    PassportModule,
    UploadModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    UserService,
    RolesService,
    SessionService,
    JwtStrategy,
    BcryptService,
    MailService,
    MailerService,
    JwtRefreshStrategy,
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
