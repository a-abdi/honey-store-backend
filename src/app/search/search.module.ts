import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [SearchController],
  imports: [ProductsModule]
})
export class SearchModule {}
