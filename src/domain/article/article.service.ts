import { Injectable } from '@nestjs/common';
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

  async createArticle(
    data: Prisma.ArticleCreateInput & { tags: string[] },
    userId: number,
  ) {
    const genslug = slugify(data.title);
    const uniqueSlug = await this.generateUniqueSlug(genslug);

    console.log(data.tags);
    console.log(genslug);
    console.log(uniqueSlug);

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

  async findAll() {
    return await this.findWithPagination({ limit: 3 });
  }

  findAllFavorite(userId: number) {
    const whereInput: Prisma.ArticleWhereInput = {
      favoritedBy: { some: { id: userId } },
    };
    const inCludeInput: Prisma.ArticleInclude = {
      tags: true,
      author: true,
    };
    return this.findWithPagination({
      where: whereInput,
      include: inCludeInput,
      limit: 3,
    });
  }

  async findOne(id: number) {
    return await this.findOrFailById(id);
  }

  async findByTag(tagName: string) {
    const where: Prisma.ArticleWhereInput = {
      tags: {
        some: { name: tagName },
      },
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

  async update(
    id: number,
    data: Prisma.ArticleUpdateInput & { tags: string[] },
  ) {
    const { tags, content, description, title } = data;
    let slug: string;
    if (title) {
      slug = slugify(title as string);
      slug = await this.generateUniqueSlug(slug);
    }
    let tagConnectOrCreate;
    if (tags) {
      tagConnectOrCreate = tags.map((tagName) => ({
        connectOrCreate: {
          where: { name: tagName },
          create: { name: tagName },
        },
      }));
    }

    return this.databaseService.article.update({
      where: { id },
      data: {
        title,
        description,
        content,
        slug,
        tags: tags ? { connectOrCreate: tagConnectOrCreate } : undefined,
      },
      include: {
        tags: true,
        author: true,
      },
    });
  }

  async remove(id: number) {
    return await this.deleteOrFailById(id);
  }

  async addFavorite(articleId: number, userId: number): Promise<Article> {
    const article = await this.databaseService.article.update({
      where: { id: articleId },
      data: {
        favoritedBy: {
          connect: { id: userId },
        },
        favoritesCount: {
          increment: 1,
        },
      },
      include: {
        favoritedBy: true,
      },
    });
    return article;
  }

  async removeFavorite(articleId: number, userId: number): Promise<Article> {
    const article = await this.databaseService.article.update({
      where: { id: articleId },
      data: {
        favoritedBy: {
          disconnect: { id: userId },
        },
        favoritesCount: {
          decrement: 1,
        },
      },
      include: {
        favoritedBy: true,
      },
    });
    return article;
  }

  private async generateUniqueSlug(
    slug: string,
    count: number = 0,
  ): Promise<string> {
    const newSlug = count === 0 ? slug : `${slug}-${count}`;
    const existingArticle = await this.databaseService.article.findUnique({
      where: { slug: newSlug },
    });

    if (existingArticle) {
      return this.generateUniqueSlug(slug, count + 1);
    }

    return newSlug;
  }
}
