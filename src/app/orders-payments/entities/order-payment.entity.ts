import { Document, Schema as MongooseSchema } from "mongoose";
import { OrderStatus } from "src/common/declare/enum";
import { Payment } from "./payment.entity";
import { CartProduct } from "./cart-order.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class OrderPayment {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
    userId: MongooseSchema.Types.ObjectId;
    
    @Prop({ 
        type: [{ 
            productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
            name: { type: String },
            imageSrc: { type: String },
            price: { type: Number },
            discount: { type: Number },
            quantity: { type: Number },
        }] 
    })
    cart: CartProduct[];
    
    @Prop()
    amount: number;
    
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

export type OrderPaymentDocument = OrderPayment & Document;

export const OrderPaymetSchema = SchemaFactory.createForClass(OrderPayment);