import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthUserInfo } from "src/interface/auth-user-info";
import { OrderPayment } from "../entities/order-payment.entity";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { Document, Types } from "mongoose";
import { AxiosError } from "axios";
import {  PaymentInterface } from "../interface/interface";
import { OrdersPaymentsService } from "../orders-payments.service";

@Injectable()
export class PaymentHelper {
    constructor(
        private readonly httpService: HttpService,
        private readonly ordersPaymentsService: OrdersPaymentsService,
    ) {}

    async createTransaction(user: AuthUserInfo, order: OrderPayment & Document<any, any, any> & {
        _id: Types.ObjectId;
    } ) {
        const url = 'https://api.idpay.ir/v1.1/payment';
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': 'e852d706-76cc-44ec-8360-df1b6b43bada',
            'X-SANDBOX': 1,
        };
        const data = {
            'order_id': order.id,
            'amount': order.id,
            'phone': user.phoneNumber,
            'callback': 'http://localhost/callback',
        };

        return await firstValueFrom(
        this.httpService.post(url, data, { headers }).pipe(map((res) => res.data)).pipe(
            catchError((error: AxiosError) => {
                const payment: PaymentInterface =  {
                    error: error.response.data
                    
                }
                this.ordersPaymentsService.updateOrder(order.id, { payment });
                throw new ForbiddenException('خطا در ارتباط با درگاه پرداخت');
            }),
            ),
        );

    }
}