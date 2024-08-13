import { Module } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AuthGoogleController } from './auth-google.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from 'src/domain/auth/auth.service';
import { UserService } from 'src/domain/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from 'src/domain/sessions/session.service';
import { RolesService } from 'src/domain/roles/roles.service';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { MailService } from 'src/mail/mail.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [ConfigModule],
  controllers: [AuthGoogleController],
  providers: [
    AuthGoogleService,
    AuthService,
    UserService,
    JwtService,
    SessionService,
    RolesService,
    BcryptService,
    MailService,
    MailerService,
  ],
})
export class AuthGoogleModule {}
