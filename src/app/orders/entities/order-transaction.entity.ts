import { Document, Schema as MongooseSchema } from "mongoose";
import { OrderStatus } from "src/common/declare/enum";
import { Transaction, TransactionSchema } from "./transaction.entity";
import { CartProduct, CartProductSchema } from "./cart-order.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/app/users/entities/user.entity";

@Schema({timestamps: true})
export class OrderTransaction {
    _id: MongooseSchema.Types.ObjectId;

    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User', required: true})
    user: MongooseSchema.Types.ObjectId | User;
    
    @Prop({ type: [ CartProductSchema ] })
    cart: CartProduct[];
    
    @Prop({required: true})
    amount: number;
    
    @Prop({required: true, unique: true, select: false})
    orderId: string;
    
    @Prop({ type: Number, enum: OrderStatus, default: 0})
    status: OrderStatus;
    
    @Prop({ type: TransactionSchema })
    transaction: Transaction;
}

export type OrderTransactionDocument = OrderTransaction & Document;

export const OrderTransactionSchema = SchemaFactory.createForClass(OrderTransaction);