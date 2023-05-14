import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderTransactionInterface } from './interface/interface';
import { OrderTransaction, OrderTransactionDocument } from './entities/order-payment.entity';
import { Model, Schema } from 'mongoose';

@Injectable()
export class OrdersTransactionsService {
    constructor(@InjectModel(OrderTransaction.name) private readonly orderTransactionModel: Model<OrderTransactionDocument> ) {}
    
    async createOrder(orderTransaction: OrderTransactionInterface) {
        return await this.orderTransactionModel.create(orderTransaction);
    }

    async updateOrder(_id: Schema.Types.ObjectId, orderTransactionData: any) {
        return await this.orderTransactionModel
        .findOneAndUpdate(
            { _id }, 
            {
                $set: orderTransactionData 
            },
            { new: true }
        ).exec();
    };

    async find(orderTransactionFilter: any) {
        return await this.orderTransactionModel.findOne(orderTransactionFilter).exec();
    };
}
