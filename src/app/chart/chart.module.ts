import { Module } from '@nestjs/common';
import { ChartController } from './chart.controller';
import { OrdersTransactionsModule } from '../orders/orders-transactions.module';
import { QueryHelper } from './helper/query.helper';

@Module({
  providers: [ QueryHelper ],
  controllers: [ChartController],
  imports: [
    OrdersTransactionsModule
  ]
})
export class ChartModule {}
