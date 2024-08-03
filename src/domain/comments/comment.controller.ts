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
import { Public } from 'src/core/decorator/public.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:articleId')
  async create(
    @Body() content: CreateCommentDto,
    @Request() req,
    @Param('articleId') articleId: string,
  ) {
    return await this.commentService.create(
      content.content,
      req.user.id,
      +articleId,
    );
  }

  @Get('byArticle/:id')
  @Public()
  async findAll(@Param('id', ParseIntPipe) articleId: number) {
    return await this.commentService.getCommentsByArticleId(articleId);
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id', ParseIntPipe) commentId: number) {
    return await this.commentService.getCommentById(commentId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
    @Request() req,
  ) {
    return await this.commentService.updateComment(
      +id,
      data.content,
      req.user.id,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req, @Res() res: Response) {
    await this.commentService.deleteComment(+id, req.user.id);
    return res.status(HttpStatus.OK).json({ message: 'delete succesfully!' });
  }
}
