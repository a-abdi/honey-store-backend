import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class RecipientUserEntity {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    phoneNumber: string;
}

export const RecipientUserEntitySchema = SchemaFactory.createForClass(RecipientUserEntity);