import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";

@Schema({ _id: false })
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
    error: MongooseSchema.Types.Mixed;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);