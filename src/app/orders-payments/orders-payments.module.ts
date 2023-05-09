import { Module } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsController } from './orders-payments.controller';
import { CartsModule } from '../carts/carts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderPayment, OrderPaymetSchema } from './entities/order-payment.entity';
import { ProductsModule } from '../products/products.module';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';

@Module({
  controllers: [OrdersPaymentsController],
  providers: [OrdersPaymentsService, ProductHelper, CartHelper],
  imports: [
    CartsModule,
    ProductsModule,
    MongooseModule.forFeature([{name: OrderPayment.name, schema: OrderPaymetSchema}]),
  ]
})
export class OrdersPaymentsModule {}
