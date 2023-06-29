import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(
    Category.name) private readonly categoryModel: Model<CategoryDocument> 
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.create(createCategoryDto);
  }

  async findAll(query = {}) {
    return await this.categoryModel.find().populate('properties').exec();
  }

  async findByID(_id: Schema.Types.ObjectId) {
    return await this.categoryModel.findOne({_id}).populate('properties').exec();
  }

  async findByName(name: string) {
    return await this.categoryModel.findOne({name}).exec();
  }

  async update(_id: Schema.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findOneAndUpdate({_id}, updateCategoryDto, {new: true}).populate('properties').exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.categoryModel.deleteOne({_id}).exec();
  }

  async insertMany(createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
    return await this.categoryModel.insertMany(createCategoryDto);
  }
}
