import { Injectable } from "@nestjs/common";
import { ProductsService } from "../products.service";
import { OrdersTransactionsService } from "src/app/orders-payments/orders-transactions.service";
import { ProductQueryDto } from "../dto/product-query.dto";
import { Sort } from "src/common/declare/enum";
import { filter } from "rxjs";
import { Schema } from "mongoose";

@Injectable()
export class SortHelper {
    constructor(
        private readonly productsService: ProductsService,
        private readonly ordersTransactionsService: OrdersTransactionsService,
    ) 
    {}
    private readonly sortValue = [
        { createdAt: 1 },
        { createdAt: -1 },
        { price: 1 },
        { price: -1 },
        { score: -1 },
        { discount: -1 },
        { mostPurchased: Sort.Des }
    ];

    async findBySortAndFilter(query: ProductQueryDto, sortIndex: number) {
        if (sortIndex < 7) {
            const opt = { sort: this.sortValue[sortIndex] };
            !query.deletedAt && (query.deletedAt = false);
            return await this.productsService.findAll(query, opt);
        }
        if (sortIndex = 7) {
            const { category, deletedAt } = query;
            let queryFilter: {
                "product.category"?: Schema.Types.ObjectId,
                "product.deletedAt"?: boolean
            }[] = [];
            category && (queryFilter.push( { "product.category": category }));
            typeof deletedAt !== 'undefined' ? queryFilter.push( { "product.deletedAt": deletedAt }): queryFilter.push( { "product.deletedAt": false });
            return (await this.ordersTransactionsService.findStatusOrder(Sort.Des, queryFilter)).map(value => value.product[0]);
        }
    }

    sortCount() {
        return this.sortValue.length;
    }
}