import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ImageHelper } from './helper/image.helper';
import { UrlHelper } from 'src/common/helper/url.helper';
import { OrdersTransactionsModule } from '../orders-payments/orders-transactions.module';
import { CartsModule } from '../carts/carts.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ImageHelper, UrlHelper],
  imports: [
    forwardRef(() => OrdersTransactionsModule),
    forwardRef(() => CartsModule),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MulterModule.register({
      dest: './upload',
    })
  ],
  exports: [
    ProductsService,
  ]
})
export class ProductsModule {}
