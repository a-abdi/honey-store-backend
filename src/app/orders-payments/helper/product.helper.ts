import { Injectable } from "@nestjs/common";
import { ProductsService } from "src/app/products/products.service";

@Injectable()
export class ProductHelper {
    constructor(private readonly productService: ProductsService) {}
    
    async decreaseProductQuantity(carts) {
        for (const cart of carts.products) {
            const product = cart._id;
            this.productService.update(product._id, {$inc: {quantity: -cart.quantity}});
        }
    }
}