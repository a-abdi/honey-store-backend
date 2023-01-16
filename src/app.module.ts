import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule as AdminAuthModule } from './auth/admins/auth-admin.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
