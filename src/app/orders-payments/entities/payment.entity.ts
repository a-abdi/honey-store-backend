import { Prop } from "@nestjs/mongoose";
import { Schema } from "mongoose";

export class Payment {
    @Prop()
    status: number;

    @Prop()
    transactionId: string;

    @Prop()
    transactionLink: string;

    @Prop()
    trackId: number;

    @Prop()
    cartNo: string;

    @Prop()
    error: Schema.Types.Mixed;
}
