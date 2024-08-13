import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
import { Public } from 'src/core/decorators/public.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:slug')
  async create(
    @Body() content: CreateCommentDto,
    @Request() req,
    @Param('slug') slug: string,
  ) {
    return await this.commentService.create(content.content, req.user.id, slug);
  }

  @Get('byArticle/:slug')
  @Public()
  async findAll(@Param('slug') slug: string) {
    return await this.commentService.getCommentsByArticleId(slug);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) commentId: number) {
    return await this.commentService.getCommentById(commentId);
  }

  @Patch('/:slug/:commentId')
  async update(
    @Param('slug') slug: string,
    @Param('commentId') commentId: string,
    @Body() data: UpdateCommentDto,
    @Request() req,
  ) {
    return await this.commentService.updateComment(
      +commentId,
      slug,
      data.content,
      req.user.id,
    );
  }

  @Delete('/:slug/:commentId')
  async remove(
    @Param('slug') slug: string,
    @Param('commentId') commentId: string,
    @Request() req,
    @Res() res: Response,
  ) {
    await this.commentService.deleteComment(+commentId, req.user.id, slug);
    return res.status(HttpStatus.OK).json({ message: 'delete succesfully!' });
  }
}
