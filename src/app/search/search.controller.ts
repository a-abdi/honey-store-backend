import { Controller, Get, Query, Req } from '@nestjs/common';
import { SearchDto } from './dto/product-query.dto';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { UrlHelper } from 'src/common/helper/url.helper';
import { Request } from 'express';

@Controller('search')
export class SearchController {
  constructor(
    private readonly productService: ProductsService,
    private readonly urlHelper: UrlHelper,
  ) {}

  @Get()
  async search(@Query() { q }: SearchDto, @Req() request: Request) {
    let products: Product[] = [];
    if (q) {
      products = await this.productService.search(q);
    } else {
      products = await this.productService.findAll({});
    }
    products.map(product => {
      this.urlHelper.bindHostUrlToProduct(product, request);
    });
    return products;
  }
}
