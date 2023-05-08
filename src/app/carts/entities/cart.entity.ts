import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/app/users/entities/user.entity';
import { Product } from 'src/app/products/entities/product.entity';

class CartProducts {
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Product'})
  _id: Product;

  @Prop()
  quantity: number;
} 

@Schema({timestamps: true})
export class Cart {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
  user: MongooseSchema.Types.ObjectId | User;

  @Prop({ type: [{ quantity:{ type:Number }, _id:{ type: MongooseSchema.Types.ObjectId } }] })
  products: CartProducts[];
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);

