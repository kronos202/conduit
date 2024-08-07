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
import { redisStore } from 'cache-manager-redis-yet';

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
    CacheModule.register({
      store: redisStore,
      ttl: 60 * 1000,
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
