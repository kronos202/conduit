import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import AllConfigType from 'src/config';
import fs from 'node:fs/promises';
import { getConfig } from 'src/utils/helpers/getConfig';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;
  private config = getConfig(this.configService);

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.transporter = nodemailer.createTransport({
      host: this.config.mail.host,
      port: this.config.mail.mail_port,
      //   secure options:
      //   ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
      // secure: configService.get('mail.secure', { infer: true }),
      secure: true,
      //   requireTLS: configService.get('mail.requireTLS', { infer: true }),
      auth: {
        user: this.config.mail.user,
        pass: this.config.mail.password,
      },
      service: 'gmail',
    });
  }
  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.config.mail.defaultName}" <${this.config.mail.default_email}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
