import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { LoggerMiddleware } from './loggers/logger.middleware';
import appConfig from '../config/app.config';
import authConfig from 'src/domain/auth/config/auth.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useValue: new PrismaClientExceptionFilter(),
    },
    Logger,
  ],
  exports: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
