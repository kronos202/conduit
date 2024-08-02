import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { CoreModule } from './core/core.module';
import { HealthModule } from './domain/health/health.module';
import { AuthModule } from './domain/auth/auth.module';
import { UserController } from './domain/user/user.controller';
import { UserService } from './domain/user/user.service';
import { UserModule } from './domain/user/user.module';
import { RoleModule } from './domain/roles/roles.module';
import { SessionModule } from './domain/session/session.module';
import { ArticleModule } from './domain/article/article.module';

@Module({
  imports: [
    UploadModule,
    CoreModule,
    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
    SessionModule,
    ArticleModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, Logger, UserService],
})
export class AppModule {}
