import { Schema } from "mongoose";
import { Status } from "src/common/declare/enum";
import { Payment } from "./payment.entity";
import { CartProduct } from "./cart-order.entity";

export class Order {
    userId: Schema.Types.ObjectId;
    cart: CartProduct[];
    amout: number;
    code: string;
    status: Status;
    payment: Payment;
}
