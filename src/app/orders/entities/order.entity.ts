import { Schema } from "mongoose";
import { Status } from "src/common/declare/enum";
import { Payment } from "./payment.entity";

export class Order {
    userId: Schema.Types.ObjectId;

    cartId:Schema.Types.ObjectId;

    amout: number;

    code: string;

    status: Status;

    payment: Payment;
}
