import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthUserInfo } from "src/interface/auth-user-info";
import { OrderPayment } from "../entities/order-payment.entity";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { Document, Schema, Types } from "mongoose";
import { AxiosError } from "axios";
import {  PaymentInterface, TransactionInterFace } from "../interface/interface";
import { OrdersPaymentsService } from "../orders-payments.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaymentHelper {
    constructor(
        private readonly httpService: HttpService,
        private readonly ordersPaymentsService: OrdersPaymentsService,
        private configService: ConfigService
    ) {}

    async createTransaction(user: AuthUserInfo, order: OrderPayment & Document<any, any, any> & {
            _id: Types.ObjectId;
        } ) {
        const url = this.configService.get<string>('CREATE_TRANSACTION_URL');
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.configService.get<string>('X_API_KEY'),
            'X-SANDBOX': this.configService.get<boolean>('X_SANDBOX'),
        };
        const data = {
            'order_id': order.id,
            'amount': order.amount,
            'phone': user.phoneNumber,
            'callback': this.configService.get<string>('TRANSACTION_CALLBACK'),
        };

        return await firstValueFrom(
        this.httpService.post<TransactionInterFace>(url, data, { headers }).pipe(map((res) => res.data)).pipe(
            catchError((error: AxiosError) => {
                const payment: PaymentInterface =  {
                    error: error.response.data
                }
                this.ordersPaymentsService.updateOrder(order.id, { payment });
                throw new ForbiddenException('خطا در ارتباط با درگاه پرداخت');
            }),
            ),
        );
    };

    async verifyPaymentHelper(orderId: Schema.Types.ObjectId, id: string) {
        const url = this.configService.get<string>('VERIFY_PAYMENT_URL');
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.configService.get<string>('X_API_KEY'),
            'X-SANDBOX': this.configService.get<boolean>('X_SANDBOX'),
        };
        const data = {
            'order_id': orderId,
            id,
        };

        return await firstValueFrom(
        this.httpService.post(url, data, { headers }).pipe(map((res) => res.data)).pipe(
            catchError((error: AxiosError) => {
                const payment: PaymentInterface =  {
                    error: error.response.data
                }
                this.ordersPaymentsService.updateOrder(orderId, { payment });
                throw new ForbiddenException('خطا در ارتباط با درگاه پرداخت');
            }),
            ),
        );
    }
}