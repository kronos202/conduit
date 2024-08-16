import {
  Global,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { LoggerMiddleware } from './loggers/logger.middleware';
import appConfig from '../config/app/app.config';
import authConfig from 'src/config/auth/auth.config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import mailConfig from 'src/config/mail/mail.config';
import googleConfig from 'src/config/google/google.config';
import { PrismaConfigService } from './service/prisma-config.service';
import AllConfigType from 'src/config';

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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AllConfigType>) => ({
        store: await redisStore({
          url:
            configService.get('app.nodeEnv', { infer: true }) === 'development'
              ? ''
              : 'redis://default:fAJNbXrRBlBndNWDxuVnXimBzBsIdRUo@monorail.proxy.rlwy.net:45737',
          ttl: 60 * 1000,
        }),
      }),
      inject: [ConfigService],
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
