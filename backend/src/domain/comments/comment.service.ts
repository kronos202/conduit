import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommentService {
  constructor(private databaseService: PrismaService) {}
  create(content: string, authorId: number, articleId: number) {
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

  async getCommentsByArticleId(articleId: number) {
    return await this.databaseService.comment.findMany({
      where: { articleId },
      include: {
        article: true,
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

  async updateComment(id: number, content: string, userId: number) {
    const comment = await this.databaseService.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this comment.',
      );
    }
    return await this.databaseService.comment.update({
      where: { id },
      data: { content },
      include: {
        article: true,
      },
    });
  }

  async deleteComment(id: number, userId: number) {
    const comment = await this.databaseService.comment.findUnique({
      where: { id },
    });

    if (!comment || comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return await this.databaseService.comment.delete({
      where: { id },
    });
  }
}
