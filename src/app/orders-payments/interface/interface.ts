import { Schema } from "mongoose";
import { Product } from "src/app/products/entities/product.entity";
import { User } from "src/app/users/entities/user.entity";
import { OrderStatus } from "src/common/declare/enum";

export interface OrderPaymentInterface {
    user: Schema.Types.ObjectId | User;
    cart: CartProductInterface[];
    amount: number;
    code: string;
    status?: OrderStatus;
    payment?: PaymentInterface;
}

export interface PaymentInterface {
    status?: number;
    transactionId?: string;
    transactionLink?: string;
    trackId?: number;
    cartNo?: string;
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
