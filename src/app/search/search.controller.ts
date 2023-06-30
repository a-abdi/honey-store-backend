import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from './dto/product-query.dto';
import { ProductsService } from '../products/products.service';

@Controller('search')
export class SearchController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async search(@Query() { q }: SearchDto) {
    
    return await this.productService.search(q);
  }
}
