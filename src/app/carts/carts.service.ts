import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(@Inject(Cart.name) private readonly cartsModel: Model<CartDocument>){}

  async create(createCartDto: CreateCartDto) {
    return await this.cartsModel.create(createCartDto);
  }

  async findAll() {
    return await this.cartsModel.find().exec();
  }

  async findOne(_id: string) {
    return this.cartsModel.find({_id}).exec();
  }

  async update(_id: string, updateCartDto: UpdateCartDto) {
    return await this.cartsModel.findOneAndUpdate({_id}, updateCartDto, {new: true}).exec();
  }

  async remove(_id: string) {
    return await this.cartsModel.findByIdAndRemove({_id}).exec();
  }
}
