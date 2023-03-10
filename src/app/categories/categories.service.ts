import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll() {
    return await this.categoryModel.find().exec();
  }

  async findByID(_id: string) {
    return await this.categoryModel.findOne({_id}).exec();
  }

  async findByName(name: string) {
    return await this.categoryModel.findOne({name}).exec();
  }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.findOneAndUpdate({_id}, updateCategoryDto, {new: true});
  }

  async remove(_id: string) {
    return await this.categoryModel.deleteOne({_id}) 
  }
}
