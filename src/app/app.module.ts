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
import { OrdersPaymentsModule } from './orders-payments/orders-payments.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/asal'), 
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
    OrdersPaymentsModule,
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
