import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({timestamps: true})
export class Category {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export type CategoryDocument = Category & Document;

export const CategoryModel = SchemaFactory.createForClass(Category);