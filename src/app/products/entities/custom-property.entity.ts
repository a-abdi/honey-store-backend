import { IntersectionType, OmitType } from "@nestjs/mapped-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Property } from "src/app/property/entities/property.entity";

@Schema({ _id: false })
export class CustomPropertyEntity extends OmitType(Property, ['category']) {
    @Prop()
    value: MongooseSchema.Types.Mixed;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true})
    type: string;

    @Prop([String])
    unit: string[];
}

export const CustomPropertySchema = SchemaFactory.createForClass(CustomPropertyEntity);
