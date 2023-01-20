import { Product } from "src/app/products/entities/product.entity";
import { Schema } from 'mongoose';

export type CartProduct = {
    product: Schema.Types.ObjectId | Product;
    name: string;
    imageSrc: string;
    price: number;
    discount: number;
    quantity: number;
}