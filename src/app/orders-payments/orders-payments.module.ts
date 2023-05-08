import { Module } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { OrdersPaymentsController } from './orders-payments.controller';

@Module({
  controllers: [OrdersPaymentsController],
  providers: [OrdersPaymentsService]
})
export class OrdersPaymentsModule {}
