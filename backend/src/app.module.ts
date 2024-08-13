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
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { AuthGoogleModule } from './auth-google/auth-google.module';

@Module({
  imports: [
    CoreModule,
    UploadModule,
    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
    SessionModule,
    ArticleModule,
    TagModule,
    CommentModule,
    FollowerModule,
    MailModule,
    MailerModule,
    AuthGoogleModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
