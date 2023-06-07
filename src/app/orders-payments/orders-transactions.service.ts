import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderTransactionInterface } from './interface/interface';
import { OrderTransaction, OrderTransactionDocument } from './entities/order-transaction.entity';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { OrderStatus } from 'src/common/declare/enum';

@Injectable()
export class OrdersTransactionsService {
    constructor(@InjectModel(OrderTransaction.name) private readonly orderTransactionModel: Model<OrderTransactionDocument> ) {}
    
    async createOrder(orderTransaction: OrderTransactionInterface) {
        return await this.orderTransactionModel.create(orderTransaction);
    }

    async updateOrder(orderId: string, orderTransactionData: any) {
        return await this.orderTransactionModel
        .findOneAndUpdate(
            { orderId }, 
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

    async findByUserAndProduct(user: AuthUserInfo, productId: Schema.Types.ObjectId, statusList: OrderStatus[]) {
        return await this.orderTransactionModel.findOne(
            {
                $and: [
                    {user: user.userId},
                    {"cart.productId": productId},
                    {
                        status: { $in: statusList }
                    }
                ] 
            }
        ).exec();
    };

    async findByOrderStatus(status: number){
        return await this.orderTransactionModel.find({status}).select([
            'orderId', 'cart', 'amount', 'status', 'transaction', 'createdAt'
        ]).populate('user').exec();
    }

    async findOneById(_id: Schema.Types.ObjectId){
        return await this.orderTransactionModel.find({_id}).populate({
            path: 'cart',
            populate: {
                path: 'productId',
                model: 'Product'
            }
        }).exec();
    }
}
