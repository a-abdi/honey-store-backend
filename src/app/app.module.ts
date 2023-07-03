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
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponse } from '../common/interceptor/transform-response';
import { OrdersTransactionsModule } from './orders/orders-transactions.module';
import { PropertyModule } from './property/property.module';
import { CommentModule } from './comment/comment.module';
import 'dotenv/config';
import { HttpExceptionFilter } from 'src/common/exceptio-filter/http-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';
import { SeederModule } from 'src/data/seeder/seeder.module';
import { FakerModule } from 'src/data/faker/faker.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ProductsModule, 
    AdminsModule, 
    AdminAuthModule,
    UserAuthModule,
    CartsModule,
    CategoriesModule,
    UsersModule,
    OrdersTransactionsModule,
    PropertyModule,
    CommentModule,
    SeederModule,
    FakerModule,
    SearchModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponse,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
