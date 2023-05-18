import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) 
  {}
  
  async create(
    createProductDto: CreateProductDto, 
    productImagesSrc: string[], 
    additionalsImageSrc: string[], 
    user: AuthUserInfo
  ): Promise<Product> {
    return await this.productModel.create({
      ...createProductDto,
      productImagesSrc,
      additionalsImageSrc,
      admin: user.userId
    });
  }

  findAll() {
    return this.productModel.find().populate('category').exec();
  }

  async findOne(_id: Schema.Types.ObjectId) {
    return this.productModel.findOne({_id}).populate('category').exec();
  }

  async productList(ids: Schema.Types.ObjectId[]) {
    return await this.productModel.find({_id: { $in: ids }}).exec();
  }

  async update(_id, updateData: any) {
    return await this.productModel.findOneAndUpdate( {_id}, updateData, {new: true}).exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.productModel.findOneAndRemove({_id});
  }
}
