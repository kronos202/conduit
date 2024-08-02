import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from 'src/core/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createArticleDto: Prisma.ArticleCreateInput & { tags: string[] },
    @Request() req,
  ) {
    return this.articleService.createArticle(createArticleDto, req.user.id);
  }

  @Get('byTag')
  async findByTag(@Query('tag') tag: string) {
    return await this.articleService.findByTag(tag);
  }

  @Get('all')
  findAll() {
    return this.articleService.findAll();
  }

  @Post('favorite/:id')
  // @UseGuards(AuthGuard('jwt'))
  addFavorite(@Request() req, @Param('id') id: string) {
    return this.articleService.addFavorite(+id, 18);
  }

  @Delete('favorite/:id')
  // @UseGuards(AuthGuard('jwt'))
  removeFavorite(@Request() req, @Param('id') id: string) {
    return this.articleService.removeFavorite(+id, 18);
  }

  @Get('favorite')
  @UseGuards(AuthGuard('jwt'))
  findAllFavorite(@Request() req) {
    return this.articleService.findAllFavorite(req.user.id);
  }

  @Get('test')
  @Roles(RoleEnum.user)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  test(@Request() req) {
    console.log(req.user);
    return 'asd';
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.ArticleUpdateInput & { tags: string[] },
  ) {
    return this.articleService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.articleService.remove(+id);
    return res.status(HttpStatus.OK).json({ message: 'delete sucess' });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOrFailById(+id);
  }
}
