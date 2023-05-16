import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Product } from "src/app/products/entities/product.entity";

@Schema({ _id: false })
export class CartProduct {
    @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Product'})
    productId: MongooseSchema.Types.ObjectId | Product;
    
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

export const CartProductSchema = SchemaFactory.createForClass(CartProduct);