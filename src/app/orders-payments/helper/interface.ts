import { Schema } from "mongoose";
import { Product } from "src/app/products/entities/product.entity";
import { OrderStatus } from "src/common/declare/enum";

export interface OrderPaymentInterface {
    userId: Schema.Types.ObjectId;
    cart: CartProductInterface[];
    amount: number;
    code: string;
    status?: OrderStatus;
    payment?: PaymentInterface;
}

export interface PaymentInterface {
        status: number;
        transactionId: string;
        trackId: number;
        cartNo: string;
}

export interface CartProductInterface {
    productId: Schema.Types.ObjectId | Product;
    name: string;
    imageSrc: string;
    price: number;
    discount: number;
    quantity: number;
}