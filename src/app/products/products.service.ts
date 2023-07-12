import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, QueryOptions, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './entities/product.entity';
import { ProductQueryDto } from './dto/product-query.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PropertyResponse } from './interface/Property.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async create(
    createProductDto: CreateProductDto,
    productImagesSrc: string[],
    additionalsImageSrc: string[],
    user: AuthUserInfo
  ): Promise<Product> {
    this.cacheManager.reset();
    return await this.productModel.create({
      ...createProductDto,
      productImagesSrc,
      additionalsImageSrc,
      admin: user.userId
    });
  }

  async findAll(query: any = {}, opt: QueryOptions = {}): Promise<Product[]> {
    return await this.productModel.find(query, {}, opt).lean().exec();
  }

  async findOne(q: any = {}): Promise<Product> {
    return this.productModel.findOne(q).lean().exec();
  }

  async findOneWithProperty(_id: Schema.Types.ObjectId): Promise<(Product & PropertyResponse)[]> {
    return await this.productModel.aggregate([
      {
        $match: {
          $expr: {
            $eq: ['$_id', { $toObjectId: _id }]
          }
        }
      },
      {
        $lookup: {
          from: "properties",
          let: { productLabel: "$customProperty.label" },
          pipeline: [
            {
              $match: {
                $and: [
                  { description: { $ne: null } },
                  { $expr: { $in: ["$label", "$$productLabel"] } }
                ]
              }
            },
            { $project: { _id: 0, description: 1, label: 1 } }
          ],
          as: "property"
        }
      }
    ])
  }

  async productList(ids: Schema.Types.ObjectId[]): Promise<Product[]> {
    return await this.productModel.find({ _id: { $in: ids } }).exec();
  }

  async update(_id: Schema.Types.ObjectId, updateData: any, session: mongoose.ClientSession | null = null): Promise<Product> {
    this.cacheManager.reset();
    return await this.productModel.findOneAndUpdate({ _id }, updateData, { new: true }).session(session).exec();
  }

  async remove(_id: Schema.Types.ObjectId): Promise<Product> {
    this.cacheManager.reset();
    return await this.productModel.findOneAndRemove({ _id }).exec();
  }

  async insertMany(products: Omit<Product, '_id'>[]): Promise<Product[]> {
    return await this.productModel.insertMany(products);
  }

  async sortByTotalPrice(filter: any, queryOpt: QueryOptions) {
    return await this.productModel.aggregate([
      {
        $addFields: {
          totalPrice: {
            $subtract: ["$price", "$discount"]
          }
        }
      },
      {
        $match: filter
      },
      {
        $sort: queryOpt.sort
      },
      {
        $limit: queryOpt.limit
      }
    ]);
  }
}
