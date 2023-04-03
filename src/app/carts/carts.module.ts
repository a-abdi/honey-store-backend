import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    MongooseModule.forFeature([{name: Cart.name, schema: CartSchema}]),
    ProductsModule,
  ]
})
export class CartsModule {}
