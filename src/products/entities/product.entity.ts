import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({timestamps: true})
export class Product {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({required: true})
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

//   @Prop()
//   specifications: {
//     size: number;
//     color: string;
//   }

  @Prop()
  description: string;

  @Prop()
  code: string;

  // @Prop({type: [MongooseSchema.Types.ObjectId], ref: Admin._Id})
  // admin: MongooseSchema.Types.ObjectId | Admin;

  // @Prop({type: [MongooseSchema.Types.ObjectId], ref: Category._Id})
  // admin: MongooseSchema.Types.ObjectId | Category;

  @Prop()
  discount: number;

  @Prop()
  image: string;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
