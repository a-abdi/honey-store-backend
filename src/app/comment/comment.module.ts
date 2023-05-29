import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { OrdersTransactionsModule } from '../orders-payments/orders-transactions.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    UsersModule,
    OrdersTransactionsModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ]
})
export class CommentModule {}
