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

    async updateOrderTransaction(_id: Schema.Types.ObjectId, orderTransaction: Partial<OrderTransactionInterface>) {
        const { transaction } = orderTransaction;
        return await this.orderTransactionModel
        .findOneAndUpdate(
            { _id }, 
            {
                $set: {
                    status: orderTransaction.status,
                    "transaction.status": transaction.status,
                    "transaction.id": transaction.id,
                    "transaction.link": transaction.link,
                    "transaction.trackId": transaction.trackId,
                    "transaction.cartNo": transaction.cartNo,
                    "transaction.error": transaction.error,
                } 
            },
            { new: true }
        ).exec();
    };

    async find(orderTransactionFilter: any) {
        return await this.orderTransactionModel.findOne(orderTransactionFilter).exec();
    };

    async updateOrder(_id: Schema.Types.ObjectId, orderTransaction: Partial<OrderTransactionInterface>) {
        return await this.orderTransactionModel.findOneAndUpdate(
            { _id }, 
            { $set: orderTransaction },
            { new: true }
        ).exec();
    };
}
