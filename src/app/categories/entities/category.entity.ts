import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Property } from "src/app/property/entities/property.entity";

@Schema({timestamps: true})
export class Category {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({required: true, unique: true})
    name: string;

    @Prop()
    description?: string;

    @Prop()
    imageSrc: string;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Property' }] })
    properties?: Property[];
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);