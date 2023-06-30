import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products/products.module';
import { UrlHelper } from 'src/common/helper/url.helper';

@Module({
  controllers: [SearchController],
  providers: [UrlHelper],
  imports: [ProductsModule]
})
export class SearchModule {}
