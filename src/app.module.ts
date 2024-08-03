import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { CoreModule } from './core/core.module';
import { HealthModule } from './domain/health/health.module';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/users/user.module';
import { RoleModule } from './domain/roles/roles.module';
import { SessionModule } from './domain/sessions/session.module';
import { ArticleModule } from './domain/articles/article.module';
import { TagModule } from './domain/tags/tag.module';
import { CommentModule } from './domain/comments/comment.module';
import { FollowerModule } from './domain/followers/follower.module';

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
    TagModule,
    CommentModule,
    FollowerModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
