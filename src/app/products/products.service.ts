import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ) 
  {}
  
  async create(createProductDto: CreateProductDto, file: Express.Multer.File, user: AuthUserInfo): Promise<Product> {
    return await new this.productModel({
      ...createProductDto,
      imageSrc: file.path,
      admin: user.userId
    }).save();
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

  async update(_id: Schema.Types.ObjectId, updateData) {
    return await this.productModel.findOneAndUpdate( {_id}, updateData, {new: true}).exec();
  }

  async remove(_id: Schema.Types.ObjectId) {
    return await this.productModel.findOneAndRemove({_id});
  }
}
