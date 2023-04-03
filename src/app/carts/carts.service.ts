import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private readonly cartsModel: Model<CartDocument>){}

  async addToCart(product: any, user: AuthUserInfo) {
    await this.cartsModel.findOneAndUpdate(
      { user: user.userId },
      { $push: { "products": product }},
      { upsert: true }
    );
  };

  async findAll() {
    return await this.cartsModel.find().exec();
  }

  async findOne(_id: string) {
    return this.cartsModel.findOne({_id}).exec();
  }

  async findByIdAndUserId(_id: string, user: string) {
    return this.cartsModel.findOne({ $and: [{_id}, {user}]}).exec();
  }

  async update(productId: string, updateCartDto: UpdateCartDto, user: AuthUserInfo) {
    const { product } = updateCartDto;
    return await this.cartsModel.findOneAndUpdate( 
      { 
        $and: [ 
          { user: user.userId }, 
          { "products._id": productId } 
        ] 
      },
      {
        $set: {
          "products.$.name": product?.name,
          "products.$.imageSrc": product?.imageSrc,
          "products.$.price": product?.price,
          "products.$.discount": product?.discount,
          "products.$.quantity": product?.quantity,
        }
      },
      {
        new: true
      }
  )
  }

  async removeFromCart(_id: string, user: AuthUserInfo) {
    return await this.cartsModel.findOneAndUpdate(
      { user: user.userId },
      { $pull: { products: { _id } } }
    )
  }
}
