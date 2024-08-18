import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { FollowerService } from '../followers/follower.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, FollowerService],
})
export class ArticleModule {}
