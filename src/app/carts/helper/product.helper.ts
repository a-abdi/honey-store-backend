import { Injectable } from "@nestjs/common";
import { Product } from "src/app/products/entities/product.entity";

@Injectable()
export class ProductHelper {
    getProductNotDeleted(productList: Product[]) {
        let productNotDelete: Product[] = [];
        for (let index = 0; index < productList.length; index++) {
            const product = productList[index];
            if(!product.deletedAt) {
                productNotDelete.push(product);
            }
        }
        return productNotDelete;
    }
}