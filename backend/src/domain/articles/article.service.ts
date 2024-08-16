import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { BaseService } from 'src/core/service/base.service';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import slugify from 'slugify';

@Injectable()
export class ArticleService extends BaseService<
  CreateArticleDto,
  UpdateArticleDto,
  Prisma.ArticleWhereInput,
  any,
  Prisma.ArticleInclude
> {
  constructor(databaseService: PrismaService) {
    super(databaseService, 'Article');
  }

  async createArticle(data: CreateArticleDto, userId: number) {
    const genslug = slugify(data.title);
    const uniqueSlug = await this.generateUniqueSlug(genslug);

    const tagConnectOrCreate = data.tags.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName },
    }));

    return await this.databaseService.article.create({
      data: {
        ...data,
        slug: uniqueSlug,
        tags: {
          connectOrCreate: tagConnectOrCreate,
        },
        author: {
          connect: { id: userId },
        },
      },
      include: {
        tags: true,
      },
    });
  }

  async updateArticle(slug: string, data: UpdateArticleDto, userId: number) {
    const { tags, content, description, title } = data; //as
    let slugUpdate: string;
    if (title) {
      slugUpdate = slugify(title as string);
      slugUpdate = await this.generateUniqueSlug(slugUpdate);
    }
    let tagConnectOrCreate = undefined;
    if (tags) {
      tagConnectOrCreate = data.tags.map((tagName) => ({
        where: { name: tagName },
        create: { name: tagName },
      }));
    }

    return this.databaseService.article.update({
      where: { slug, authorId: userId, deletedAt: null },
      data: {
        title,
        description,
        content,
        slug: slugUpdate,
        tags: {
          connectOrCreate: tagConnectOrCreate,
        },
      },
      include: {
        tags: true,
        author: true,
      },
    });
  }

  async findAll() {
    const where: Prisma.ArticleWhereInput = {
      deletedAt: null,
    };
    const include: Prisma.ArticleInclude = {
      author: true,
      tags: true,
    };

    return await this.findWithPagination({ limit: 3, include, where });
  }
  async findMyArticles(userId: number) {
    const where: Prisma.ArticleWhereInput = {
      authorId: {
        equals: userId,
      },
      deletedAt: null,
    };
    const include: Prisma.ArticleInclude = {
      author: true,
      tags: true,
    };

    return await this.findWithPagination({ limit: 3, include, where });
  }

  async findArticlesByUserId(userId: number) {
    const where: Prisma.ArticleWhereInput = {
      authorId: {
        equals: userId,
      },
      deletedAt: null,
    };
    const include: Prisma.ArticleInclude = {
      author: true,
      tags: true,
    };

    return await this.findWithPagination({ limit: 3, include, where });
  }

  async findAllFavorite(userId: number) {
    const whereInput: Prisma.ArticleWhereInput = {
      deletedAt: null,
      favoritedBy: { some: { id: userId } },
    };
    const inCludeInput: Prisma.ArticleInclude = {
      tags: true,
      author: true,
    };
    return await this.findWithPagination({
      where: whereInput,
      include: inCludeInput,
      limit: 3,
    });
  }

  async findOne(id: number) {
    return await this.findOrFailById({ id });
  }

  async findBySlug(slug: string) {
    const where: Prisma.ArticleWhereInput = {
      slug,
      deletedAt: null,
    };

    const include: Prisma.ArticleInclude = {
      author: true,
      tags: true,
    };

    return await this.findUnique({
      where,
      include,
    });
  }

  async findByTag(tagNames: string[]) {
    const where: Prisma.ArticleWhereInput = {
      tags: {
        some: {
          name: {
            in: tagNames,
          },
        },
      },
      deletedAt: null,
    };
    const include: Prisma.ArticleInclude = {
      tags: true,
      author: true,
    };
    return this.findWithPagination({
      where,
      include,
      limit: 3,
    });
  }

  async remove(slug: string, userId: number) {
    const where: Prisma.ArticleWhereInput = {
      slug,
      authorId: userId,
    };

    return await this.delete({
      where,
    });
  }

  async toggleFavorite(articleId: number, userId: number): Promise<Article> {
    const article = await this.databaseService.article.findUnique({
      where: { id: articleId },
      include: { favoritedBy: true },
    });

    const isFavorited = article.favoritedBy.some((user) => user.id === userId);

    return this.databaseService.article.update({
      where: { id: articleId },
      data: {
        favoritedBy: isFavorited
          ? { disconnect: { id: userId } }
          : { connect: { id: userId } },
        favoritesCount: {
          [isFavorited ? 'decrement' : 'increment']: 1,
        },
      },
      include: {
        favoritedBy: true,
      },
    });
  }

  private async generateUniqueSlug(
    slug: string,
    count: number = 0,
  ): Promise<string> {
    const newSlug = count === 0 ? slug : `${slug}-${count}`;

    const where: Prisma.ArticleWhereInput = {
      slug: newSlug,
    };

    const existingArticle = await this.findUnique({ where });

    if (existingArticle) {
      return this.generateUniqueSlug(slug, count + 1);
    }

    return newSlug;
  }

  private async checkAuthorization(articleId: number, userId: number) {
    const article = await this.databaseService.article.findUnique({
      where: { id: articleId },
    });

    if (article.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this article',
      );
    }

    return article;
  }

  async softDeleteArticle(slug: string, userId: number) {
    const where: Prisma.ArticleWhereInput = {
      authorId: userId,
      slug,
    };

    return await this.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restoreArticle(slug: string, userId: number) {
    const where: Prisma.ArticleWhereInput = {
      authorId: userId,
      slug,
    };

    return await this.update({
      where,
      data: {
        deletedAt: null,
      },
    });
  }
}
