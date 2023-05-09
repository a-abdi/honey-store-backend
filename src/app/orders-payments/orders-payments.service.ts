import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderPaymentInterface } from './interface/interface';
import { OrderPayment, OrderPaymentDocument } from './entities/order-payment.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersPaymentsService {
    constructor(@InjectModel(OrderPayment.name) private readonly orderPaymentModel: Model<OrderPaymentDocument> ) {}
    
    async createOrder(orderPayment: OrderPaymentInterface) {
        return await this.orderPaymentModel.create(orderPayment);
    }
}
