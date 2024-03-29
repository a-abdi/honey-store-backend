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

  async findAll() {
    return this.propertyModel.find({}).exec();
  }

  async findList(labelList: string[]) {
    return this.propertyModel.aggregate([
      {
        $match: {
          $and: [
            {
              label: {
                $in: labelList
              }
            },
            {
              description: {
                $ne: null
              }
            }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          label: 1,
          description: 1
        }
      }
    ])
  };

  async findOne(propertyFilter: any) {
    return await this.propertyModel.findOne(propertyFilter).exec();
};

  async update(_id: Schema.Types.ObjectId, updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyModel.findByIdAndUpdate({ _id }, updatePropertyDto, { new: true }).exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return this.propertyModel.findByIdAndRemove({ _id }).exec();
  }

  async insertMany(createPropertyDto: CreatePropertyDto[]): Promise<Property[]> {
    return await this.propertyModel.insertMany(createPropertyDto);
  }
}
