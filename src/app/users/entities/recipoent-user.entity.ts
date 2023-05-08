import { Prop } from "@nestjs/mongoose";

export class RecipientUserEntity {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    phoneNumber: string;
}