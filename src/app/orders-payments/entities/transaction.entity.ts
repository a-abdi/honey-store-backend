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
    cartNo: string;

    @Prop()
    error: Schema.Types.Mixed;
}
