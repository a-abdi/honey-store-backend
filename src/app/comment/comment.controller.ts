import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { MongoIdParams } from 'src/common/helper';

@Controller('product')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':productId/comment')
  async create(@Param() params: MongoIdParams, @Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(params.productId, createCommentDto);
  }

  @Get(':productId/comment')
  async findAll(@Param() params: MongoIdParams) {
    return await this.commentService.findAll(params.productId);
  }

  @Get(':productId/comment/commentId')
  findOne(@Param() params: MongoIdParams) {
    return this.commentService.findOne(params.commentId);
  }

  @Patch(':productId/comment/commentId')
  update(@Param() params: MongoIdParams, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(params.commentId, updateCommentDto);
  }

  @Delete(':productId/comment/commentId')
  remove(@Param() params: MongoIdParams) {
    return this.commentService.remove(params.commentId);
  }
}
