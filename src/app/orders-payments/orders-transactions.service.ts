import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderTransactionInterface } from './interface/interface';
import { OrderTransaction, OrderTransactionDocument } from './entities/order-transaction.entity';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';

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

    async findUserOrders(user: AuthUserInfo) {
        return await this.orderTransactionModel.find({user: user.userId}).exec();
    };
}
