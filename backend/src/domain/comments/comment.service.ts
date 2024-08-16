import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateArticleDto } from '../articles/dto/create-article.dto';
import { UpdateArticleDto } from '../articles/dto/update-article.dto';
import { BaseService } from 'src/core/service/base.service';
import { ArticleService } from '../articles/article.service';

@Injectable()
export class CommentService extends BaseService<
  CreateArticleDto,
  UpdateArticleDto,
  Prisma.CommentWhereInput,
  Prisma.CommentSelect,
  Prisma.CommentInclude
> {
  constructor(
    databaseService: PrismaService,
    private articleService: ArticleService,
  ) {
    super(databaseService, 'Article');
  }

  async createComment(content: string, authorId: number, slug: string) {
    const articleId = await this.findArticleIdBySlug(slug);

    return this.databaseService.comment.create({
      data: {
        content,
        author: { connect: { id: authorId } },
        article: { connect: { id: articleId } },
      },
      include: {
        article: {
          include: { comments: true },
        },
      },
    });
  }

  async getCommentsByArticleId(slug: string) {
    const articleId = await this.findArticleIdBySlug(slug);

    const where: Prisma.CommentWhereInput = {
      articleId,
    };

    const include: Prisma.CommentInclude = {
      article: true,
      author: true,
    };

    return this.findMany({
      where,
      include,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getCommentById(id: number) {
    return this.findUnique({
      where: { id },
      include: { article: true },
    });
  }

  async updateComment(
    commentId: number,
    slug: string,
    content: string,
    userId: number,
  ) {
    const articleId = await this.findArticleIdBySlug(slug);

    const comment = await this.findUnique({
      where: { id: commentId, articleId },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this comment.',
      );
    }

    return await this.update({
      where: { id: commentId, articleId },
      data: { content },
      include: {
        article: true,
      },
    });
  }

  async deleteComment(id: number, userId: number, slug: string) {
    const articleId = await this.findArticleIdBySlug(slug);

    const comment = await this.findUnique({
      where: {
        id,
        articleId,
      },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return await this.delete({
      where: { id, articleId },
    });
  }

  private async findArticleIdBySlug(slug: string) {
    const article = await this.articleService.findBySlug(slug);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.id;
  }
}
