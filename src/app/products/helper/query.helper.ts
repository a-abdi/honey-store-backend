import { Inject, Injectable } from "@nestjs/common";
import { ProductQueryDto } from "../dto/product-query.dto";
import { Sort } from "src/common/declare/enum";
import { QueryOptions } from "mongoose";
import { Product } from "../entities/product.entity";
import { QueryDto } from "src/common/dto/query.dto";
import { SortQuery } from "src/common/declare/sort-query";
import { ProductsService } from "../products.service";

@Injectable()
export class QueryHelper {
    constructor(
        @Inject('SORT_QUERY') private readonly sortQuery: SortQuery,
        private readonly productsService: ProductsService,
    ) {}

    filter(queryDto: ProductQueryDto) {
        const { deletedAt, previousPage, nextPage, category, sort } = queryDto;
        const filter: any = { deletedAt };
        category && (filter.category = category );
        const cursorField = this.sortQuery[sort].key;
        let operator = (this.sortQuery[sort].type === Sort.Des) ? '$lt' : '$gt';
        let cursor = nextPage;
        if (previousPage) {
            operator = (this.sortQuery[sort].type === Sort.Des) ? '$gt' : '$lt';
            cursor = previousPage;
        }   
        if (cursor) {
            let [cursorId, cursorParam] : string[] | number[] = cursor.split('_');
            if (this.sortQuery[sort].keyType === 'number') {
              cursorParam = Number(cursorParam);
            }
            if (cursorField === '_id') {
                filter.$expr = { [operator]: ["$_id", { $toObjectId: cursorId }] }
            } else {
                filter.$or = [
                    { [cursorField]: { [operator]: cursorParam } },
                    {
                        [cursorField]: cursorParam,
                        $expr: { [operator]: ["$_id", { $toObjectId: cursorId }] }
                    }
                ]
            }
        } 
        return filter;
    }

    option(queryDto: ProductQueryDto) {
        const { previousPage, limit, sort } = queryDto;
        let queryOpt: QueryOptions = { limit, sort: this.sortQuery[sort].value };
        if (previousPage) {
            queryOpt = { limit, sort: this.sortQuery[sort].reverse };
        }
        return queryOpt;
    } 

    previousPage(products: Product[], queryDto: QueryDto) {
        const { sort, deletedAt } = queryDto;
        const cursorField = this.sortQuery[sort].key;
        const previousPageQuery: any = { deletedAt };
        const operator = (this.sortQuery[sort].type === Sort.Des) ? '$gt' : '$lt';
        const cursorParam = products[0][cursorField];
        let previousId = cursorParam;
        if (cursorField === '_id') {
            previousPageQuery.$expr = { [operator]: ["$_id", { $toObjectId: cursorParam }] }
        } else {
            previousId = products[0]._id
            previousPageQuery.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    [cursorField]: cursorParam,
                    $expr: { [operator]: ["$_id", { $toObjectId:  products[0]._id }] }
                }
            ]
        }
        return { previousPageQuery, previousId };
    }

    nextPage(products: Product[], queryDto: QueryDto) {
        const { sort, deletedAt } = queryDto;
        const cursorField = this.sortQuery[sort].key;
        const nextPageQuery: any = { deletedAt };
        const operator = (this.sortQuery[sort].type === Sort.Des) ? '$lt' : '$gt';
        const cursorParam = products[products.length - 1][cursorField];
        let nextId = cursorParam;
        if (cursorField === '_id') {
            nextPageQuery.$expr = { [operator]: ["$_id", { $toObjectId: cursorParam }] }
        } else {
            nextId = products[products.length - 1]._id;
            nextPageQuery.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    $and: [
                        {[cursorField]: cursorParam},
                        {$expr: { [operator]: ["$_id", { $toObjectId: products[products.length - 1]._id }] }}
                    ]
                }
            ]
        }
        return { nextPageQuery, nextId };
    }

    async getData(sort :number, filter: any, queryOpt: QueryOptions) {
        switch (sort) {
            case 0: 
            case 1: 
                return await this.productsService.sortByTotalId(filter, queryOpt);

            case 2: 
            case 3: 
                return await this.productsService.sortByTotalPrice(filter, queryOpt);
                
            default:
                return [];
        }
    }
}