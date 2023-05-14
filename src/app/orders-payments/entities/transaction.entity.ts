import { Prop } from "@nestjs/mongoose";
import { Schema } from "mongoose";

export class Transaction {
    @Prop()
    status: number;

    @Prop()
    id: string;

    @Prop()
    link: string;

    @Prop()
    trackId: number;

    @Prop()
    cartNo: string;

    @Prop()
    error: Schema.Types.Mixed;
}
