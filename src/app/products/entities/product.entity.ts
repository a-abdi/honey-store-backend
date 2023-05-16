import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Admin } from 'src/app/admins/entities/admin.entity';
import { Category } from 'src/app/categories/entities/category.entity';

@Schema({timestamps: true})
export class Product {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

//   @Prop()
//   specifications: {
//     size: number;
//     color: string;
//   }

  @Prop()
  description: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Admin', select: false})
  admin: MongooseSchema.Types.ObjectId | Admin;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Category'})
  category: MongooseSchema.Types.ObjectId | Category;

  @Prop()
  discount: number;

  @Prop()
  imageSrc: string;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
