import { Prop } from "@nestjs/mongoose";

export class Payment {
    @Prop()
    status: number;

    @Prop()
    transactionId: string;

    @Prop()
    trackId: number;

    @Prop()
    cartNo: string;
}
