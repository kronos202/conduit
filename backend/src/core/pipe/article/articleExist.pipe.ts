import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ArticleExitPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      throw new BadRequestException('Article not found');
    }

    return article.id;
  }
}
