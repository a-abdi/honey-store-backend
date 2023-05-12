import { Injectable } from "@nestjs/common";
import { Cart } from "src/app/carts/entities/cart.entity";
import { Product } from "src/app/products/entities/product.entity";
import { ProductsService } from "src/app/products/products.service";

@Injectable()
export class ProductHelper {
    constructor(private readonly productService: ProductsService) {}
    
    async decreaseProductQuantity(carts: Cart) {
        for (const cart of carts.products) {
            const product = cart.product as Product;
            this.productService.update(product._id, {$inc: {quantity: -cart.quantity}});
        }
    }
}