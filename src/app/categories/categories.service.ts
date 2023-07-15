import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { CreateCategoryData, UpdateCategoryData } from './interface/category-data.interface';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(
    Category.name) private readonly categoryModel: Model<CategoryDocument> 
  ) {}

  async create(createCategoryData: CreateCategoryData) {
    return await this.categoryModel.create(createCategoryData);
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

  async update(_id: Schema.Types.ObjectId, updateData: UpdateCategoryData) {
    return await this.categoryModel.findOneAndUpdate({_id}, updateData, {new: true}).populate('properties').exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.categoryModel.deleteOne({_id}).exec();
  }

  async insertMany(createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
    return await this.categoryModel.insertMany(createCategoryDto);
  }
}
