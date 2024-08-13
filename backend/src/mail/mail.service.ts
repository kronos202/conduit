import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AllConfigType from 'src/config';
import path from 'path';
import { MailerService } from 'src/mailer/mailer.service';
import { MailData } from './interfaces/mail-data.interface';
import { MaybeType } from 'src/utils/types/maybe';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const emailConfirmTitle: MaybeType<string> = 'Xác nhận email của bạn';
    const text1: MaybeType<string> = 'Cảm ơn bạn đã đăng ký!';
    const text2: MaybeType<string> =
      'Nhấn vào liên kết dưới đây để xác nhận địa chỉ email của bạn.';

    const text3: MaybeType<string> = 'Cảm ơn bạn rất nhiều.';

    const url = new URL(
      this.configService.getOrThrow('app.fe_url', {
        infer: true,
      }) + '/confirm-email',
    );
    url.searchParams.set('hash', mailData.data.hash);

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${url.toString()} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'activation.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        url: url.toString(),
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.app_name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }
}
