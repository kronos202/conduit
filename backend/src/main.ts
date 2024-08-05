import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { logger } from './core/loggers/logger';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './utils/validation-options';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import AllConfigType from './config';
import { PrismaExceptionFilter } from './core/filters/prisma-exeption.filter';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
    bufferLogs: true,
    cors: true,
  });

  const configService = app.get(ConfigService<AllConfigType>);
  const appPort = configService.getOrThrow('app.app_port', { infer: true });
  const apiPrefix = configService.getOrThrow('app.api_Prefix', { infer: true });
  const appName = configService.getOrThrow('app.app_name', { infer: true });

  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/'],
  });
  // app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use(helmet());

  console.table({
    port: appPort,
    name: appName,
    apiPrefix: apiPrefix,
  }),
    await app.listen(appPort);
}
bootstrap();
