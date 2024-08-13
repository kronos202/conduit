import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BcryptService } from 'src/core/service/bcrypt.service';
import { UploadModule } from 'src/upload/upload.module';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [UploadModule, MailModule, MailerModule],
  controllers: [UserController],
  providers: [UserService, BcryptService, MailService],
  exports: [UserService],
})
export class UserModule {}
