import { Inject, Injectable } from "@nestjs/common";
import { ProductQueryDto } from "../dto/product-query.dto";
import { Sort } from "src/common/declare/enum";
import { QueryOptions } from "mongoose";
import { Product } from "../entities/product.entity";
import { QueryDto } from "src/common/dto/query.dto";
import { SortQuery } from "src/common/declare/sort-query";

@Injectable()
export class QueryHelper {
    constructor(@Inject('SORT_QUERY') private readonly sortQuery: SortQuery) {}

    build(queryDto: ProductQueryDto) {
        const { deletedAt, previousPage, nextPage, category, sort } = queryDto;
        const query: any = { deletedAt };
        category && (query.category = category );
        const cursorField = this.sortQuery[sort].key;
        let operator = (this.sortQuery[sort].type === Sort.Des) ? '$lt' : '$gt';
        let cursor = nextPage;
        if (previousPage) {
            operator = (this.sortQuery[sort].type === Sort.Des) ? '$gt' : '$lt';
            cursor = previousPage;
        }   
        if (cursor) {
            const [cursorId, cursorParam] = cursor.split('_');
            if (cursorField === '_id') {
                query._id = { [operator]: cursorId }
            } else {
                query.$or = [
                    { [cursorField]: { [operator]: cursorParam } },
                    {
                        [cursorField]: cursorParam,
                        _id: { [operator]: cursorId }
                    }
                ]
            }
        } 
        return query;
    }

    option(queryDto: ProductQueryDto) {
        const { previousPage, limit, sort } = queryDto;
        let queryOpt: QueryOptions = { limit: 2, sort: this.sortQuery[sort].value };
        if (previousPage) {
            queryOpt = { limit: 2, sort: this.sortQuery[sort].reverse };
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
            previousPageQuery._id = { [operator]: cursorParam }
        } else {
            previousId = products[0]._id
            previousPageQuery.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    [cursorField]: cursorParam,
                    _id: { [operator]: products[0]._id }
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
            nextPageQuery._id = { [operator]: cursorParam }
        } else {
            nextId = products[products.length - 1]._id;
            nextPageQuery.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    [cursorField]: cursorParam,
                    _id: { [operator]: products[products.length - 1]._id }
                }
            ]
        }
        return { nextPageQuery, nextId };
    }
}