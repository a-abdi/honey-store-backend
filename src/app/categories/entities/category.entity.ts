import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({timestamps: true})
export class Category {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    description: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);