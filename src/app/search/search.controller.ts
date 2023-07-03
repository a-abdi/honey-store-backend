import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchDto } from './dto/search-query.dto';
import { ProductsService } from '../products/products.service';
import { UrlHelper } from 'src/common/helper/url.helper';
import { Request } from 'express';
import { ProductMetaDataHelper } from '../products/helper/product-metadata.helper';

@Controller('search')
export class SearchController {
  constructor(
    private readonly productService: ProductsService,
    private readonly urlHelper: UrlHelper,
    private readonly productMetaDataHelper: ProductMetaDataHelper
  ) {}

  @Get()
  async search(@Query() { deletedAt, limit, q, previousPage, nextPage }: SearchDto, @Req() request: Request) {
    const query: any = { deletedAt };
    const sort = { _id: -1 };
    q && (query.name = { $regex: q, $options: 'i'});
    previousPage && (query._id = { $gt: previousPage });
    previousPage && (sort._id = 1); 
    nextPage && (query._id = { $lt: nextPage });
    const products = await this.productService.findAll(query, { limit, sort });
    previousPage && products.reverse();
    const metaData = {
      previousPage: await this.productMetaDataHelper.previousPage(products, query),
      nextPage: await this.productMetaDataHelper.nextPage(products, query)
    }
    products.map(product => {
      this.urlHelper.bindHostUrlToProduct(product, request);
    });
    return {
      data: products,
      metaData
    };
  }
}
