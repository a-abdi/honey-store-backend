import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageHelper } from './helper/image.helper';
import { UrlHelper } from 'src/common/helper/url.helper';
import { OrdersTransactionsModule } from '../orders/orders-transactions.module';
import { CartsModule } from '../carts/carts.module';
import { SortHelper } from 'src/app/products/helper/sort.helper';
import { MaxCountSort } from 'src/service/max-count-sort';
import { ProductMetaDataHelper } from './helper/product-metadata.helper';
import { PropertyModule } from '../property/property.module';
import { QueryHelper } from './helper/query.helper';
import { SORT_QUERY } from 'src/common/declare/sort-query';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ImageHelper, 
    UrlHelper, 
    SortHelper, 
    QueryHelper,
    MaxCountSort, 
    ProductMetaDataHelper,
    {
      provide: 'SORT_QUERY',
      useValue: SORT_QUERY,
    },
  ],
  imports: [
    forwardRef(() => OrdersTransactionsModule),
    forwardRef(() => CartsModule),
    PropertyModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MulterModule.register({
      dest: './upload',
    })
  ],
  exports: [
    ProductsService,
    ProductMetaDataHelper
  ]
})
export class ProductsModule {}
