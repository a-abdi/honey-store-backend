import { Request } from "express";
import { Product } from "src/app/products/entities/product.entity";

export class UrlHelper {
    bindHostArrayUrl(urlList: string[], hostAddress: string) {
        return urlList.map(url => url =`${hostAddress}/${url}`);
    }

    getHostAddress(request: Request) {
        return `${request.protocol}://${request.get('host')}`;
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
            if (property?.value && property.type == "file") {
                property.value = `${hostAddress}/${property.value}`;
            }
        })
        return product;
    }
}