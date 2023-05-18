import { OmitType } from "@nestjs/mapped-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Property } from "src/app/property/entities/property.entity";

@Schema({ _id: false })
export class CustomPropertyEntity extends OmitType(Property, ['category']) {
    @Prop()
    value: string;

    @Prop()
    code: string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true})
    type: string;

    @Prop([String])
    unit: string[];
}

export const CustomPropertySchema = SchemaFactory.createForClass(CustomPropertyEntity);
