import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class CustomPropertyEntity {
    @Prop()
    value: string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true})
    type: string;

    @Prop()
    unit: string;
}

export const CustomPropertySchema = SchemaFactory.createForClass(CustomPropertyEntity);
