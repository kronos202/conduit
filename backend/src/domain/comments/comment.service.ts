import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentService {
  constructor(private databaseService: PrismaService) {}
  async create(content: string, authorId: number, slug: string) {
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

    return await this.databaseService.comment.findMany({
      where: { articleId },
      include: {
        article: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCommentById(id: number) {
    return await this.databaseService.comment.findUnique({
      where: { id },
      include: {
        article: true,
      },
    });
  }

  async updateComment(
    commentId: number,
    slug: string,
    content: string,
    userId: number,
  ) {
    const articleId = await this.findArticleIdBySlug(slug);

    const comment = await this.databaseService.comment.findUnique({
      where: { id: commentId, articleId },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this comment.',
      );
    }
    return await this.databaseService.comment.update({
      where: { id: commentId, articleId },
      data: { content },
      include: {
        article: true,
      },
    });
  }

  async deleteComment(id: number, userId: number, slug: string) {
    const articleId = await this.findArticleIdBySlug(slug);

    const comment = await this.databaseService.comment.findUnique({
      where: { id, articleId },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return await this.databaseService.comment.delete({
      where: { id, articleId },
    });
  }

  private async findArticleIdBySlug(slug: string) {
    const article = await this.databaseService.article.findUnique({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.id;
  }
}
