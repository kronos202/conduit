import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { logger } from './core/loggers/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
    bufferLogs: true,
  });
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
