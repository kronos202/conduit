import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { LoggerMiddleware } from './loggers/logger.middleware';
import appConfig from '../config/app/app.config';
import authConfig from 'src/config/auth/auth.config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import mailConfig from 'src/config/mail/mail.config';
import googleConfig from 'src/config/google/google.config';
import { PrismaConfigService } from './service/prisma-config.service';
import type { ClientOpts } from 'redis';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig, mailConfig, googleConfig],
      envFilePath: ['.env'],
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    CacheModule.register<ClientOpts>({
      url: `${process.env.REDISURL}`,
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
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
