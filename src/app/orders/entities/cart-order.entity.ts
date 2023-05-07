import { Schema } from "mongoose";

export class CartProduct {
    productId: Schema.Types.ObjectId;
    name: string;
    imageSrc: string;
    price: number;
    discount: number;
    quantity: number;
}
