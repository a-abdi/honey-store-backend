import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewpointService } from './viewpoint.service';
import { CreateViewpointDto } from './dto/create-viewpoint.dto';
import { UpdateViewpointDto } from './dto/update-viewpoint.dto';

@Controller('viewpoint')
export class ViewpointController {
  constructor(private readonly viewpointService: ViewpointService) {}

  @Post()
  create(@Body() createViewpointDto: CreateViewpointDto) {
    return this.viewpointService.create(createViewpointDto);
  }

  @Get()
  findAll() {
    return this.viewpointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewpointDto: UpdateViewpointDto) {
    return this.viewpointService.update(+id, updateViewpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewpointService.remove(+id);
  }
}
