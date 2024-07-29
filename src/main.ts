import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { logger } from './core/loggers/logger';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app-config.type';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
    bufferLogs: true,
  });

  const configService = app.get(ConfigService<AppConfig>);
  const appPort = configService.getOrThrow('app_port', { infer: true });
  const apiPrefix = configService.getOrThrow('api_Prefix', { infer: true });
  const appName = configService.getOrThrow('app_name', { infer: true });

  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/'],
  });
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  app.use(helmet());

  console.table({
    port: appPort,
    name: appName,
    apiPrefix: apiPrefix,
  }),
    await app.listen(appPort);
}
bootstrap();
