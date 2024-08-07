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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { Public } from 'src/core/decorator/public.decorator';
import { SerializeInterceptor } from 'src/core/interceptors/serialize.interceptor';
import { ArticleExitPipe } from 'src/core/pipe/article/articleExist.pipe';

@Controller('article')
@UseInterceptors(SerializeInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  create(
    @Body() createArticleDto: Prisma.ArticleCreateInput & { tags: string[] },
    @Request() req,
  ) {
    return this.articleService.createArticle(createArticleDto, req.user.id);
  }

  @Get('byTag')
  @Public()
  async findByTag(@Query('tag') tag: string[]) {
    return await this.articleService.findByTag(tag);
  }

  @Get('all')
  @Public()
  findAll() {
    return this.articleService.findAll();
  }

  @Post('toggleFavorite/:id')
  toggleFavorite(@Request() req, @Param('id', ArticleExitPipe) id: string) {
    return this.articleService.toggleFavorite(+id, req.user.id);
  }

  @Get('favorite')
  findAllFavorite(@Request() req) {
    return this.articleService.findAllFavorite(req.user.id);
  }

  @Get('myArticles')
  findMyArticles(@Request() req) {
    return this.articleService.findMyArticles(req.user.id);
  }

  @Get(':slug')
  @Public()
  findBySlug(@Param('slug') slug: string) {
    return this.articleService.findBySlug(slug);
  }

  @Patch(':id')
  async update(
    @Param('id', ArticleExitPipe) id: string,
    @Body() data: Prisma.ArticleUpdateInput & { tags: string[] },
    @Request() req,
  ) {
    return this.articleService.update(+id, data, req.user.id);
  }

  @Delete(':id')
  async remove(
    @Param('id', ArticleExitPipe) id: string,
    @Res() res: Response,
    @Request() req,
  ) {
    await this.articleService.remove(+id, req.user.id);
    return res.status(HttpStatus.OK).json({ message: 'delete sucess' });
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOrFailById(+id);
  }
}
