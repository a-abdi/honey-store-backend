import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RecipientUserEntity, RecipientUserEntitySchema } from "./recipoent-user.entity";

@Schema({ _id: false })
export class AddressUserEntity {
    @Prop()
    postalAddress: string;

    @Prop()
    province: string;

    @Prop()
    city: string;

    @Prop()
    plaque: string;

    @Prop({ type: RecipientUserEntitySchema })
    recipient: RecipientUserEntity;

    @Prop()
    postalCode: string;

    @Prop()
    selected: boolean;
};

export const AddressUserEntitySchema = SchemaFactory.createForClass(AddressUserEntity);