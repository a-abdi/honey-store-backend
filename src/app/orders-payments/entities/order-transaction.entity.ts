import { Document, Schema as MongooseSchema } from "mongoose";
import { OrderStatus } from "src/common/declare/enum";
import { Transaction } from "./transaction.entity";
import { CartProduct } from "./cart-order.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/app/users/entities/user.entity";

@Schema({timestamps: true})
export class OrderTransaction {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User', required: true})
    user: MongooseSchema.Types.ObjectId | User;
    
    @Prop({ 
        type: [{ 
            productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
            name: { type: String },
            imageSrc: { type: String },
            price: { type: Number },
            discount: { type: Number },
            quantity: { type: Number },
        }],
        _id: false
    })
    cart: CartProduct[];
    
    @Prop({required: true})
    amount: number;
    
    @Prop({required: true})
    code: string;
    
    @Prop({ type: Number, enum: OrderStatus, default: 0})
    status: OrderStatus;
    
    @Prop({
        type: {
            status: { type: Number },
            id: { type: String },
            link: { type: String },
            trackId: { type: Number },
            cardNo: { type: String },
            hashedCardNo: { type: String },
            transactionDate: { type: Date },
            transactionAmount: { type: Number },
            paymentTrackId: { type: String },
            paymentAmount: { type: Number },
            paymentDate: { type: Date },
            verifyDate: { type: Date },
            error: { type: MongooseSchema.Types.Mixed },
        },
        _id: false
    })
    transaction: Transaction;
}

export type OrderTransactionDocument = OrderTransaction & Document;

export const OrderTransactionSchema = SchemaFactory.createForClass(OrderTransaction);