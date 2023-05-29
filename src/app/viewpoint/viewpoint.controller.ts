import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewpointService } from './viewpoint.service';
import { CreateViewpointDto } from './dto/create-viewpoint.dto';
import { UpdateViewpointDto } from './dto/update-viewpoint.dto';
import { MongoIdParams } from 'src/common/helper';

@Controller('product')
export class ViewpointController {
  constructor(private readonly viewpointService: ViewpointService) {}

  @Post(':productId/comment')
  async create(@Param() params: MongoIdParams, @Body() createViewpointDto: CreateViewpointDto) {
    return await this.viewpointService.create(params.productId, createViewpointDto);
  }

  @Get(':productId/comment')
  async findAll(@Param() params: MongoIdParams) {
    return await this.viewpointService.findAll(params.productId);
  }

  @Get(':productId/comment/commentId')
  findOne(@Param() params: MongoIdParams) {
    return this.viewpointService.findOne(params.commentId);
  }

  @Patch(':productId/comment/commentId')
  update(@Param() params: MongoIdParams, @Body() updateViewpointDto: UpdateViewpointDto) {
    return this.viewpointService.update(params.commentId, updateViewpointDto);
  }

  @Delete(':productId/comment/commentId')
  remove(@Param() params: MongoIdParams) {
    return this.viewpointService.remove(params.commentId);
  }
}
