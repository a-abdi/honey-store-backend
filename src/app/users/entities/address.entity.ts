import { Prop } from "@nestjs/mongoose";
import { RecipientUserEntity } from "./recipoent-user.entity";

export class AddressUserEntity {
    @Prop()
    postalAddress: string;

    @Prop()
    province: string;

    @Prop()
    city: string;

    @Prop()
    plaque: string;

    @Prop()
    recipient: RecipientUserEntity;

    @Prop()
    postalCode: string;

    @Prop()
    selected: boolean;
};