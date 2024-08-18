import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ArticleService } from '../articles/article.service';
import { FollowerService } from '../followers/follower.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, ArticleService, FollowerService],
})
export class CommentModule {}
