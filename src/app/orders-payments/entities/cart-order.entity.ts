import { Prop } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import { Product } from "src/app/products/entities/product.entity";

export class CartProduct {
    @Prop({type: Schema.Types.ObjectId, ref: 'Product'})
    productId: Schema.Types.ObjectId | Product;
    
    @Prop()
    name: string;
    
    @Prop()
    imageSrc: string;
    
    @Prop()
    price: number;
    
    @Prop()
    discount: number;
    
    @Prop()
    quantity: number;
}
