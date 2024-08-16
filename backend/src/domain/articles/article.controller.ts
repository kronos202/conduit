import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Res,
  HttpStatus,
  Query,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Response } from 'express';
import { Public } from 'src/core/decorators/public.decorator';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';
import { ArticleExitPipe } from 'src/core/pipe/article/articleExist.pipe';
import { getArrayTagFromString } from 'src/utils/transformers/stringToArray';
import { CacheKey } from '@nestjs/cache-manager';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
@UseInterceptors(SerializeInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articleService.createArticle(createArticleDto, req.user.id);
  }

  @Get('byTag')
  @Public()
  async findByTag(@Query('tagName') tag: string) {
    const tags = getArrayTagFromString(tag);

    return await this.articleService.findByTag(tags);
  }

  @Get('all')
  @Public()
  @CacheKey('ALL_ARTICLES')
  findAll() {
    return this.articleService.findAll();
  }

  @Post('toggleFavorite/:id')
  toggleFavorite(@Request() req, @Param('id', ArticleExitPipe) id: number) {
    return this.articleService.toggleFavorite(+id, req.user.id);
  }

  @Get('favorite')
  @CacheKey('FAVORITE_ARTICLES')
  findAllFavorite(@Request() req) {
    return this.articleService.findAllFavorite(req.user.id);
  }

  @Get('myArticles')
  @CacheKey('MY_ARTICLES')
  findMyArticles(@Request() req) {
    return this.articleService.findMyArticles(req.user.id);
  }

  @Get('user/:id')
  findArticlesById(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.findArticlesByUserId(id);
  }

  @Get(':slug')
  @Public()
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Patch(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() data: UpdateArticleDto,
    @Request() req,
  ) {
    return this.articleService.updateArticle(slug, data, req.user.id);
  }

  @Patch('softDelete/:slug')
  async softDeleteArticle(@Param('slug') slug: string, @Request() req) {
    return this.articleService.softDeleteArticle(slug, req.user.id);
  }

  @Patch('restoreArticle/:slug')
  async restoreArticle(@Param('slug') slug: string, @Request() req) {
    return this.articleService.restoreArticle(slug, req.user.id);
  }

  @Delete(':slug')
  async remove(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Request() req,
  ) {
    await this.articleService.remove(slug, req.user.id);
    return res.status(HttpStatus.OK).json({ message: 'delete sucess' });
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOrFailById({ id: +id });
  }
}
