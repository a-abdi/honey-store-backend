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

    @Prop([String])
    unit: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }] })
    category: Category[];

    @Prop()
    description: string;
}

export type ProppertyDocument = Property & Document;

export const PropertySchema = SchemaFactory.createForClass(Property);