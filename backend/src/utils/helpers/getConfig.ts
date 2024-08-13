import { ConfigService } from '@nestjs/config';
import AllConfigType from 'src/config';

export const getConfig = (configService: ConfigService<AllConfigType>) => {
  return {
    app: {
      appPort: configService.getOrThrow('app.app_port', { infer: true }),
      apiPrefix: configService.getOrThrow('app.api_Prefix', { infer: true }),
      appName: configService.getOrThrow('app.app_name', { infer: true }),
      database_name: configService.getOrThrow('app.database_name', {
        infer: true,
      }),
      database_host: configService.getOrThrow('app.database_host', {
        infer: true,
      }),
      database_password: configService.getOrThrow('app.database_password', {
        infer: true,
      }),
      database_port: configService.getOrThrow('app.database_port', {
        infer: true,
      }),
      database_username: configService.getOrThrow('app.database_username', {
        infer: true,
      }),
      fe_url: configService.getOrThrow('app.fe_url', { infer: true }),
      nodeEnv: configService.getOrThrow('app.nodeEnv', { infer: true }),
      workingDirectory: configService.getOrThrow('app.workingDirectory', {
        infer: true,
      }),
    },
    auth: {
      confirmEmailExpires: configService.getOrThrow(
        'auth.confirmEmailExpires',
        { infer: true },
      ),
      confirmEmailSecret: configService.getOrThrow('auth.confirmEmailSecret', {
        infer: true,
      }),
      expires_time: configService.getOrThrow('auth.expires_time', {
        infer: true,
      }),
      refreshExpires: configService.getOrThrow('auth.refreshExpires', {
        infer: true,
      }),
      secret_key: configService.getOrThrow('auth.secret_key', { infer: true }),
      refreshSecret: configService.getOrThrow('auth.refreshSecret', {
        infer: true,
      }),
    },
    google: {
      clientId: configService.getOrThrow('google.clientId', { infer: true }),
      clientSecret: configService.getOrThrow('google.clientSecret', {
        infer: true,
      }),
    },
    mail: {
      defaultName: configService.getOrThrow('mail.defaultName', {
        infer: true,
      }),
      default_email: configService.getOrThrow('mail.default_email', {
        infer: true,
      }),
      host: configService.getOrThrow('mail.host', { infer: true }),
      mail_port: configService.getOrThrow('mail.mail_port', { infer: true }),
      password: configService.getOrThrow('mail.password', { infer: true }),
      user: configService.getOrThrow('mail.user', { infer: true }),
    },
  };
};
