import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthUserInfo } from "src/interface/auth-user-info";
import { OrderTransaction } from "../entities/order-transaction.entity";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { Document, Schema, Types } from "mongoose";
import { AxiosError } from "axios";
import { CreateTransactionInterFace, OrderTransactionInterface } from "../interface/interface";
import { OrdersTransactionsService } from "../orders-transactions.service";
import { ConfigService } from "@nestjs/config";
import { CartsService } from "src/app/carts/carts.service";
import { CartHelper } from "./cart.helper";
import { createRandomCode } from "src/common/helper";
import { Message } from "src/common/message";

@Injectable()
export class TransactionHelper {
    constructor(
        private readonly httpService: HttpService,
        private readonly ordersTransactionsService: OrdersTransactionsService,
        private readonly configService: ConfigService,
        private readonly cartService: CartsService,
        private readonly cartHelper: CartHelper
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
                this.ordersTransactionsService.updateOrder(order.id, { "transaction.error": error.response.data });
                throw new InternalServerErrorException(Message.ERROR_OCCURRED());

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
        this.httpService.post(url, data, { headers }).pipe(
            catchError((error: AxiosError) => {
                this.ordersTransactionsService.updateOrder(orderId, { "transaction.error": error.response.data });
                throw Error;
            }),
            ),
        );
    };

    async uniqueTransaction(id: string, trackId: number, orderId: Schema.Types.ObjectId) {
        const queryFilter = {
            $or: [
                {
                    $and: [ 
                        {
                            "transaction.id": id
                        },
                        {
                            _id: { $ne: orderId } 
                        }
                    ]
                },
                {
                    "transaction.trackId": trackId
                }
            ]
        }
        const order = await this.ordersTransactionsService.find(queryFilter);
        if (order) {
            const result = {
                isUnique: false,
                error: {
                    error_code: 101,
                    error_message: "از قبل در دیتابیس موجود می باشد transactionId یا trackId کلید های "
                }
            }
            return result;
        }
        return { 
            isUnique: true,
            error: null
         };
    }

    async getData(user: AuthUserInfo) {
        const userCart = await this.cartService.findUserCart(user?.userId);
        const transactionData: OrderTransactionInterface = userCart ? {
            amount: this.cartHelper.getAmount(userCart),
            cart: this.cartHelper.getCartProduct(userCart),
            user: user.userId,
            code: createRandomCode(),
        } : null;
        return { userCart, transactionData };
    }
}