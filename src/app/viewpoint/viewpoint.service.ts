import { Injectable } from '@nestjs/common';
import { CreateViewpointDto } from './dto/create-viewpoint.dto';
import { UpdateViewpointDto } from './dto/update-viewpoint.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Viewpoint, ViewpointDocument } from './entities/viewpoint.entity';
import { Model, Schema } from 'mongoose';

@Injectable()
export class ViewpointService {
  constructor(@InjectModel(Viewpoint.name) private readonly viewpointModel: Model<ViewpointDocument>) {}
  
  async create(product: Schema.Types.ObjectId, createViewpointDto: CreateViewpointDto) {
    return await this.viewpointModel.create({product, ...createViewpointDto});
  }

  async findAll(product: Schema.Types.ObjectId) {
    return await this.viewpointModel.find({product}).exec();
  }

  async findOne(viewpointId: Schema.Types.ObjectId) {
    return await this.viewpointModel.findOne({_id: viewpointId}).exec();
  }

  async update(viewpointId: Schema.Types.ObjectId, updateViewpointDto: UpdateViewpointDto, opt = {}) {
    return await this.viewpointModel.findOneAndUpdate({_id: viewpointId}, updateViewpointDto, opt).exec();
  }

  async remove(viewpointId: Schema.Types.ObjectId) {
    return await this.viewpointModel.findOneAndRemove({_id: viewpointId}).exec();
  }
}
