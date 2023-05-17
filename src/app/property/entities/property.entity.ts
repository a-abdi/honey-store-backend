import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema} from "mongoose";
import { Category } from "src/app/categories/entities/category.entity";

@Schema({ timestamps: true })
export class Property {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({ required: true, unique: true })
    label: string;

    @Prop({ required: true})
    type: string;

    @Prop()
    unit: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
    category: MongooseSchema.Types.ObjectId | Category;
}

export type ProppertyDocument = Property & Document;

export const PropertySchema = SchemaFactory.createForClass(Property);