import { Module, forwardRef } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { ProductsModule } from '../products/products.module';
import { UrlHelper } from 'src/common/helper/url.helper';

@Module({
  controllers: [CartsController],
  providers: [CartsService, UrlHelper],
  imports: [
    MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}]),
    forwardRef(() => ProductsModule),
  ],
  exports: [CartsService]
})
export class CartsModule {}
