import { Module } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsController } from './orders-payments.controller';
import { CartsModule } from '../carts/carts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderPayment, OrderPaymetSchema } from './entities/order-payment.entity';
import { ProductsModule } from '../products/products.module';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';
import { HttpModule } from '@nestjs/axios';
import { PaymentHelper } from './helper/payment.helper';

@Module({
  controllers: [OrdersPaymentsController],
  providers: [OrdersPaymentsService, ProductHelper, CartHelper, PaymentHelper],
  imports: [
    CartsModule,
    ProductsModule,
    HttpModule,
    MongooseModule.forFeature([{name: OrderPayment.name, schema: OrderPaymetSchema}]),
  ]
})
export class OrdersPaymentsModule {}
