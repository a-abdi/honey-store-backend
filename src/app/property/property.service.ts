import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Property, ProppertyDocument } from './entities/property.entity';
import { Model, Schema } from 'mongoose';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private readonly propertyModel: Model<ProppertyDocument> 
  ){}

  async create(createPropertyDto: CreatePropertyDto) {
    return await this.propertyModel.create(createPropertyDto);
  }

  findAll() {
    return `This action returns all property`;
  }

  async findOne(propertyFilter: any) {
    return await this.propertyModel.findOne(propertyFilter).exec();
};

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
