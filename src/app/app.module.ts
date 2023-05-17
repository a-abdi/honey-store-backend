import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule as AdminAuthModule } from './auth/admins/auth-admin.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/configuration';
import { CartsModule } from './carts/carts.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule as UserAuthModule } from './auth/users/auth-user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponse } from '../common/interceptor/transform-response';
import { OrdersTransactionsModule } from './orders-payments/orders-transactions.module';
import { PropertyModule } from './property/property.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    ProductsModule, 
    AdminsModule, 
    AdminAuthModule,
    UserAuthModule,
    CartsModule,
    CategoriesModule,
    UsersModule,
    CartsModule,
    OrdersTransactionsModule,
    PropertyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponse,
    },
  ],
})
export class AppModule {}
