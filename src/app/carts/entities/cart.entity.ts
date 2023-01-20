import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CartProduct } from '../types.ts/cart-product';

@Schema({timestamps: true})
export class Cart {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  userIp: string;

//   @Prop({type: [MongooseSchema.Types.ObjectId], ref: User._Id})
//   user: MongooseSchema.Types.ObjectId | User;

  @Prop()
  product: CartProduct;

  @Prop()
  IsBought: boolean;
}

export type ProductDocument = Cart & Document;

export const ProductSchema = SchemaFactory.createForClass(Cart);
