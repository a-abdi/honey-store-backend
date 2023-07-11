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
        const queryOpt: QueryOptions = { limit: 3, sort: this.sortQuery[sort].value };
        if (previousPage) {
            queryOpt.sort[this.sortQuery[sort].key] = -this.sortQuery[sort].type;
            queryOpt.sort._id = -queryOpt.sort._id;
        }
        return queryOpt;
    } 

    previousPage(products: Product[], queryDto: QueryDto) {
        const { sort, deletedAt } = queryDto;
        const cursorField = this.sortQuery[sort].key;
        const query: any = { deletedAt };
        const operator = (this.sortQuery[sort].type === Sort.Des) ? '$gt' : '$lt';
        const cursorParam = products[0][cursorField];
        if (cursorField === '_id') {
            query._id = { [operator]: cursorParam }
        } else {
            query.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    [cursorField]: cursorParam,
                    _id: { [operator]: products[0]._id }
                }
            ]
        }
        return query;
    }

    nextPage(products: Product[], queryDto: QueryDto) {
        const { sort, deletedAt } = queryDto;
        const cursorField = this.sortQuery[sort].key;
        const query: any = { deletedAt };
        const operator = (this.sortQuery[sort].type === Sort.Des) ? '$lt' : '$gt';
        const cursorParam = products[products.length - 1][cursorField];
        if (cursorField === '_id') {
            query._id = { [operator]: cursorParam }
        } else {
            query.$or = [
                { [cursorField]: { [operator]: cursorParam } },
                {
                    [cursorField]: cursorParam,
                    _id: { [operator]: products[products.length - 1]._id }
                }
            ]
        }
        return query;
    }
}