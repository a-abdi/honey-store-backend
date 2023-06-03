import { BadRequestException, Injectable } from "@nestjs/common";
import { Schema } from "mongoose";
import { Cart } from "src/app/carts/entities/cart.entity";
import { Product } from "src/app/products/entities/product.entity";
import { ProductsService } from "src/app/products/products.service";
import { Message } from "src/common/message";

@Injectable()
export class ProductHelper {
    constructor(
        private readonly productService: ProductsService,
    ) {}
    
    async decreaseProductQuantity(carts: Cart) {
        let productListUpdate: {_id: Schema.Types.ObjectId, quantity: number}[] = [];
        for (const cart of carts?.products) {
            const cartProduct = cart.product as Product;
            productListUpdate.push({_id: cartProduct._id, quantity: cart.quantity });
            const product = await this.productService.update(cartProduct._id, {$inc: {quantity: -cart.quantity}});
            if (product.quantity < 0) {
                for (const productUpdate of productListUpdate) {
                    await this.productService.update(productUpdate._id, {$inc: {quantity: cart.quantity}});
                }
                throw new BadRequestException(Message.NOT_ENOUGH_PRODUCT(product.name));
            }
        }
    }
}