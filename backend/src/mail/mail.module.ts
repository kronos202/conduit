import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  providers: [MailService, MailerService],
  exports: [MailService],
})
export class MailModule {}
