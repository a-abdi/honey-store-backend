import { Request } from "express";
import { Schema } from "mongoose";
import { CartDocument } from "src/app/carts/entities/cart.entity";
import { OrderTransactionDocument } from "src/app/orders-payments/entities/order-transaction.entity";
import { Product } from "src/app/products/entities/product.entity";

export class UrlHelper {
    bindHostArrayUrl(urlList: string[], hostAddress: string) {
        return urlList.map(url => url =`${hostAddress}/${url}`);
    }

    getHostAddress(request: Request) {
        return `${request.protocol}://${request.get('host')}`;
    }

    bindHostCartOrder(orders: (OrderTransactionDocument & {_id: Schema.Types.ObjectId} )[], hostAddress: string) {
        return orders.map(order => order.cart.map( cart => cart.imageSrc =  `${hostAddress}/${cart.imageSrc}`));
    }

    bindHostUrlToProduct(product: Product, request: Request) {
        const hostAddress = `${request.protocol}://${request.get('host')}`;
        product.additionalsImageSrc = this.bindHostArrayUrl(
            product.additionalsImageSrc, 
            hostAddress
        );
        product.productImagesSrc = this.bindHostArrayUrl(
            product.productImagesSrc, 
            hostAddress
        );
        product.customProperty.map(property => { 
            const regex = new RegExp(hostAddress, 'g');
            if (property?.value && property.type == "file" && !regex.test(property.value)) {
                property.value = `${hostAddress}/${property.value}`;
            }
        })
        return product;
    }
}