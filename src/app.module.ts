import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/asal'), 
    ProductsModule, AdminsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
