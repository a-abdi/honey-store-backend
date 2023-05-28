import { Injectable } from '@nestjs/common';
import { CreateViewpointDto } from './dto/create-viewpoint.dto';
import { UpdateViewpointDto } from './dto/update-viewpoint.dto';

@Injectable()
export class ViewpointService {
  create(createViewpointDto: CreateViewpointDto) {
    return 'This action adds a new viewpoint';
  }

  findAll() {
    return `This action returns all viewpoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewpoint`;
  }

  update(id: number, updateViewpointDto: UpdateViewpointDto) {
    return `This action updates a #${id} viewpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewpoint`;
  }
}
