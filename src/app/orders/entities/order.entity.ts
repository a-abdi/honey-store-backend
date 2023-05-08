import { Schema } from "mongoose";
import { OrderStatus } from "src/common/declare/enum";
import { Payment } from "./payment.entity";
import { CartProduct } from "./cart-order.entity";
import { Prop } from "@nestjs/mongoose";

export class Order {
    @Prop({type: Schema.Types.ObjectId, ref: 'User'})
    userId: Schema.Types.ObjectId;
    
    @Prop({ type: [{ 
            productId: { type: Schema.Types.ObjectId },
            name: { type: String },
            imageSrc: { type: String },
            price: { type: Number },
            discount: { type: Number },
            quantity: { type: Number },
        }] 
    })
    cart: CartProduct[];
    
    @Prop()
    amout: number;
    
    @Prop()
    code: string;
    
    @Prop({ type: String, enum: OrderStatus, default: 'WatingPay'})
    status: OrderStatus;
    
    @Prop({
        type: {
            status: { type: Number },
            transactionId: { type: String },
            trackId: { type: Number },
            cartNo: { type: String },
        }
    })
    payment: Payment;
}
