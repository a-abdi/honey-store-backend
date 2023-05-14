import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthUserInfo } from "src/interface/auth-user-info";
import { OrderTransaction } from "../entities/order-payment.entity";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { Document, Schema, Types } from "mongoose";
import { AxiosError } from "axios";
import { TransactionInterface, CreateTransactionInterFace } from "../interface/interface";
import { OrdersTransactionsService } from "../orders-transactions.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TransactionHelper {
    constructor(
        private readonly httpService: HttpService,
        private readonly ordersTransactionsService: OrdersTransactionsService,
        private configService: ConfigService
    ) {}

    async createTransaction(user: AuthUserInfo, order: OrderTransaction & Document<any, any, any> & {
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
        this.httpService.post<CreateTransactionInterFace>(url, data, { headers }).pipe(map((res) => res.data)).pipe(
            catchError((error: AxiosError) => {
                const transaction: TransactionInterface =  {
                    error: error.response.data
                }
                this.ordersTransactionsService.updateOrderTransaction(order.id, { transaction });
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
                const transaction: TransactionInterface =  {
                    error: error.response.data
                }
                this.ordersTransactionsService.updateOrderTransaction(orderId, { transaction });
                throw new ForbiddenException('خطا در ارتباط با درگاه پرداخت');
            }),
            ),
        );
    }
}