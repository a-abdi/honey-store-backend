import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) 
  {}
  
  async create(createProductDto: CreateProductDto, file: any, user: any): Promise<Product> {
    try {    
      return await new this.productModel({
        ...createProductDto,
        imageSrc: file.path,
        admin: user.adminId
      }).save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.productModel.find().populate('category').exec();
  }

  async findOne(_id: string) {
    return this.productModel.findOne({_id}).exec();
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.updateOne({_id}, updateProductDto, {new: true});

  }

  async remove(_id: string) {
    return await this.productModel.findOneAndRemove({_id});
  }
}
