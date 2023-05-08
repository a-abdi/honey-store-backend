import { Module } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsController } from './orders-payments.controller';
import { CartsModule } from '../carts/carts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderPayment, OrderPaymetSchema } from './entities/order-payment.entity';

@Module({
  controllers: [OrdersPaymentsController],
  providers: [OrdersPaymentsService],
  imports: [
    CartsModule,
    MongooseModule.forFeature([{name: OrderPayment.name, schema: OrderPaymetSchema}]),
  ]
})
export class OrdersPaymentsModule {}
