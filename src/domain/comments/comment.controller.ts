import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create/:articleId')
  @UseGuards(AuthGuard('jwt'))
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
  async findAll(@Param('id', ParseIntPipe) articleId: number) {
    return await this.commentService.getCommentsByArticleId(articleId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) commentId: number) {
    return await this.commentService.getCommentById(commentId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req, @Res() res: Response) {
    await this.commentService.deleteComment(+id, req.user.id);
    return res.status(HttpStatus.OK).json({ message: 'delete succesfully!' });
  }
}
