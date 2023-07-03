import { Request } from "express";
import { Schema } from "mongoose";
import { OrderTransactionDocument } from "src/app/orders/entities/order-transaction.entity";
import { Product } from "src/app/products/entities/product.entity";

export class UrlHelper {
    bindHostArrayUrl(urlList: string[], hostAddress: string) {
        return urlList?.map(url => url =`${hostAddress}/${url}`);
    }

    getHostAddress(request: Request) {
        return `${request.protocol}://${request.get('host')}`;
    }

    bindHostCartOrder(orders: (OrderTransactionDocument & {_id: Schema.Types.ObjectId} )[], hostAddress: string) {
        return orders?.map(order => order.cart.map( cart => cart.imageSrc =  `${hostAddress}/${cart.imageSrc}`));
    }

    bindHostUrlToProduct(product: Product, request: Request) {
        if (product && process.env.CREATE_FAKE_DATA == '0') {
            const hostAddress = `${request.protocol}://${request.get('host')}`;
            product.additionalsImageSrc = this.bindHostArrayUrl(
                product?.additionalsImageSrc, 
                hostAddress
            );
            product.productImagesSrc = this.bindHostArrayUrl(
                product?.productImagesSrc, 
                hostAddress
            );
            product.customProperty.map(property => { 
                const regex = new RegExp(hostAddress, 'g');
                if (property?.value && property?.type == "file" && !regex.test(property?.value)) {
                    property.value = `${hostAddress}/${property?.value}`;
                }
            });
        }
        return product;
    }
}