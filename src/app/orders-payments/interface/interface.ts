import { Schema } from "mongoose";
import { Product } from "src/app/products/entities/product.entity";
import { User } from "src/app/users/entities/user.entity";
import { OrderStatus } from "src/common/declare/enum";

export interface OrderTransactionInterface {
    user: Schema.Types.ObjectId | User;
    cart: CartProductInterface[];
    amount: number;
    code: string;
    status?: OrderStatus;
    transaction?: TransactionInterface;
}

export interface TransactionInterface {
    status?: number;
    id?: string;
    link?: string;
    trackId?: number;
    cardNo?: string;
    hashedCardNo?: string;
    transactionDate?: Date;
    transactionAmount?: number;
    paymentTrackId?: string;
    paymentAmount?: number;
    paymentDate?: Date;
    verifyDate?: Date;
    error?: any;
}

export interface CartProductInterface {
    productId: Schema.Types.ObjectId | Product;
    name: string;
    imageSrc: string;
    price: number;
    discount: number;
    quantity: number;
}

export interface CreateTransactionInterFace {
    id: string,
    link: string
}