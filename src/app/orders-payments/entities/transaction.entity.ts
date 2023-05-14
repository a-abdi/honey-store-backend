import { Prop } from "@nestjs/mongoose";
import { Schema } from "mongoose";

export class Transaction {
    @Prop()
    status: number;

    @Prop({unique: true})
    id: string;

    @Prop()
    link: string;

    @Prop({unique: true})
    trackId: number;

    @Prop()
    cardNo: string;

    @Prop()
    hashedCardNo: string;

    @Prop()
    transactionDate: Date;

    @Prop()
    transactionAmount: number;

    @Prop()
    paymentTrackId: string;

    @Prop()
    paymentAmount: number;

    @Prop()
    paymentDate: Date;

    @Prop()
    verifyDate: Date;

    @Prop()
    error: Schema.Types.Mixed;
}
