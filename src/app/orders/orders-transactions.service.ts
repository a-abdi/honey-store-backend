import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderTransactionInterface } from './interface/interface';
import { OrderTransaction, OrderTransactionDocument } from './entities/order-transaction.entity';
import { Model, Schema } from 'mongoose';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { OrderStatus, Sort } from 'src/common/declare/enum';
import { StatusUpdateDto } from './dto/status-update.dto';

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

    async findOne(orderTransactionFilter: any) {
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
                    {"cart.product": productId},
                    {
                        status: { $in: statusList }
                    }
                ] 
            }
        ).exec();
    };

    async findAll(filter: any){
        return await this.orderTransactionModel.find(filter).select([
            'orderId', 'cart', 'amount', 'status', 'transaction', 'createdAt'
        ]).populate('user').exec();
    }

    async report(filter: any){
        return await this.orderTransactionModel.aggregate(filter);
    }

    async findOneById(_id: Schema.Types.ObjectId){
        return await this.orderTransactionModel.findOne({_id}).exec();
    }

    async updateStatus(_id: Schema.Types.ObjectId, statusUpdateDto: StatusUpdateDto){
        return await this.orderTransactionModel.findOneAndUpdate({_id}, statusUpdateDto).exec();
    }

    async findStatusOrder(sort: Sort, filter: any[], status: number = 5) {
        return await this.orderTransactionModel.aggregate([
            {
                $match: {
                    status: status
                }
            },
            {
                $project: {
                    "cart": 1
                }
            },
            {
                $unwind: "$cart"
            },
            {
                $group: {
                    _id: "$cart.product",
                    totalByeProduct: { $sum: "$cart.quantity" }
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product"
                }
            },
            {
                $match: { $or: filter }
            },
            {
                $sort: {
                    totalByeProduct: sort
                }
            },
        ]).exec();
    }
}
