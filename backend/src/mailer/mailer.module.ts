import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  exports: [MailerService],
  providers: [MailerService, ConfigService],
  imports: [ConfigModule],
})
export class MailerModule {}
