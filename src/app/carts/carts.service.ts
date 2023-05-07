import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions } from 'mongoose';
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

  async findUserCart(user: AuthUserInfo) {
    return this.cartsModel.findOne({user: user.userId}).exec();
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

  async removeFromCart(_id: string, user: AuthUserInfo, opt: QueryOptions = {}) {
    return await this.cartsModel.findOneAndUpdate(
      { user: user.userId },
      { $pull: { products: { _id } } },
      opt
    )
  }

  async remove(user: AuthUserInfo) {
    return await this.cartsModel.findOneAndRemove({user: user.userId});
  }
}
