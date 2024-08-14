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
import { getConfig } from './utils/helpers/getConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
    bufferLogs: true,
    bodyParser: true,
  });
  console.log('DATABASE_URL', process.env.DATABASE_URL);

  app.enableCors();
  const configService = app.get(ConfigService<AllConfigType>);
  const { app: appConfig } = getConfig(configService);

  app.setGlobalPrefix(appConfig.apiPrefix, {
    exclude: ['/'],
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use(helmet());

  console.table({
    port: appConfig.appPort,
    name: appConfig.appName,
    apiPrefix: appConfig.apiPrefix,
  }),
    await app.listen(appConfig.appPort);
}
bootstrap();
