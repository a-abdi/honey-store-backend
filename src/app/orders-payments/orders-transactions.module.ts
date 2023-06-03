import { Module } from '@nestjs/common';
import { OrdersTransactionsService } from './orders-transactions.service';
import { OrdersTransactionsController } from './orders-transactions.controller';
import { CartsModule } from '../carts/carts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderTransaction, OrderTransactionSchema } from './entities/order-transaction.entity';
import { ProductsModule } from '../products/products.module';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';
import { HttpModule } from '@nestjs/axios';
import { TransactionHelper } from './helper/transaction.helper';
import { UsersModule } from '../users/users.module';
import { UserHelper } from './helper/user.helperts';
import { CommonHelper } from './helper/coomon.helper';

@Module({
  controllers: [OrdersTransactionsController],
  providers: [
    OrdersTransactionsService, 
    ProductHelper, 
    CartHelper, 
    TransactionHelper,
    UserHelper,
    CommonHelper,
  ],
  imports: [
    CartsModule,
    ProductsModule,
    UsersModule,
    HttpModule,
    MongooseModule.forFeature([{name: OrderTransaction.name, schema: OrderTransactionSchema}]),
  ],
  exports: [
    OrdersTransactionsService,
  ]
})
export class OrdersTransactionsModule {}
