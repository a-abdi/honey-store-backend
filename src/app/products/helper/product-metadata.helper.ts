import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { ProductsService } from "../products.service";
import { PropertyService } from "src/app/property/property.service";

@Injectable()
export class ProductMetaDataHelper {
    constructor(
        private readonly productService: ProductsService,
        private readonly propertyService: PropertyService,
    ){}

    async previousPage(products: Product[], query: any) {
        if (products) {
            const firstItemId = products[0]?._id;
            query._id = { $gt: firstItemId };
            const hasPrev = !!await this.productService.findOne(query);
            if (hasPrev) {
                return firstItemId;
            }
            return;
        }
    }

    async nextPage(products: Product[], query: any) {
        if (products) {
            const lastItemId = products[products.length - 1]?._id;
            query._id = { $lt: lastItemId };
            const hasNext = !!await this.productService.findOne(query);
            if (hasNext) {
                return lastItemId;
            }
            return;
        }
    }

    async propertyDescriptions(products: Product[]) {
        const properyLabel = products.map(
            product => product?.customProperty?.map(
              property => property?.label
            )
        ).flat();
    
        const unitPropertyLable = [...new Set(properyLabel)];
        return await this.propertyService.findList(unitPropertyLable);
    }
}