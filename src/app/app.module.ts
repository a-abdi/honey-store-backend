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
import { FakerModule } from 'src/app/faker/faker.module';
import { SearchModule } from './search/search.module';
import { ChartModule } from './chart/chart.module';
import { SeederModule } from './seeder/seeder.module';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SmsModule } from './sms/sms.module';
import redisConfig from 'src/config/redis.config';
import smsConfig from 'src/config/sms.config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        config,
        redisConfig,
        smsConfig
      ]
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
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
    ChartModule,
    MailingModule,
    SmsModule,
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
