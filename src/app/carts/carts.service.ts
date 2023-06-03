import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryOptions, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private readonly cartsModel: Model<CartDocument>){}

  async addToCart(product: {quantity: number, product: Schema.Types.ObjectId}, user: AuthUserInfo) {
    await this.cartsModel.findOneAndUpdate(
      { user: user.userId },
      { $push: { "products": product }},
      { upsert: true }
    );
  };

  async findUserCart(user: Schema.Types.ObjectId) {
    return this.cartsModel.findOne({user})
      .populate({
        path: 'products', populate: {
          path: 'product',
          model: 'Product'
        }
      }).exec();
  }

  async update(productId: Schema.Types.ObjectId, updateCartDto: UpdateCartDto, user: AuthUserInfo) {
    const { product } = updateCartDto;
    return await this.cartsModel.findOneAndUpdate( 
      { 
        $and: [ 
          { user: user.userId }, 
          { "products.product": productId } 
        ] 
      },
      {
        $set: {
          "products.$.quantity": product?.quantity,
        }
      },
      {
        new: true
      }
    )
  }

  async removeFromCart(product: Schema.Types.ObjectId, user: AuthUserInfo, opt: QueryOptions = {}) {
    return await this.cartsModel.findOneAndUpdate(
      { user: user.userId },
      { $pull: { products: { product } } },
      opt
    )
  }

  async remove(user: AuthUserInfo, opt = {}) {
    return await this.cartsModel.findOneAndRemove({user: user.userId}, opt);
  }
}
