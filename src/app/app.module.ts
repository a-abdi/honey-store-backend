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
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
