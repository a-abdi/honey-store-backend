import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AuthUserInfo } from "src/interface/auth-user-info";
import { OrderTransaction } from "../entities/order-transaction.entity";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { Document, Types } from "mongoose";
import { AxiosError } from "axios";
import { CartProductInterface, CreateTransactionInterFace, OrderTransactionInterface } from "../interface/interface";
import { OrdersTransactionsService } from "../orders-transactions.service";
import { ConfigService } from "@nestjs/config";
import { CartsService } from "src/app/carts/carts.service";
import { CartHelper } from "./cart.helper";
import { v4 as uuid } from 'uuid';
import { Message } from "src/common/message";
import { VerifyPaymentDto } from "../dto/verify-payment.dto";
import { OrderStatus } from "src/common/declare/enum";
import { ProductHelper } from "./product.helper";

@Injectable()
export class TransactionHelper {
    constructor(
        private readonly httpService: HttpService,
        private readonly ordersTransactionsService: OrdersTransactionsService,
        private readonly configService: ConfigService,
        private readonly cartService: CartsService,
        private readonly cartHelper: CartHelper,
        private readonly productHelper: ProductHelper
    ) { }

    async createTransaction(user: AuthUserInfo, order: OrderTransaction & Document<any, any, any> & {
        _id: Types.ObjectId;
    }, orderId: string) {
        const url = this.configService.get<string>('CREATE_TRANSACTION_URL');
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.configService.get<string>('X_API_KEY'),
            'X-SANDBOX': this.configService.get<boolean>('X_SANDBOX'),
        };
        const data = {
            'order_id': orderId,
            'amount': order.amount * 10,
            'phone': user.phoneNumber,
            'callback': this.configService.get<string>('TRANSACTION_CALLBACK'),
        };

        return await firstValueFrom(
            this.httpService.post<CreateTransactionInterFace>(url, data, { headers }).pipe(map((res) => res.data)).pipe(
                catchError(async (error: AxiosError) => {
                    this.productHelper.increaseProductQuantity(order.cart);
                    this.ordersTransactionsService.updateOrder(order.id, { "transaction.error": error.response.data });
                    throw new InternalServerErrorException(Message.ERROR_OCCURRED());
                }),
            ),
        );
    };

    async verifyPaymentHelper(orderId: string, id: string, carts: CartProductInterface[]) {
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
                catchError(async (error: AxiosError) => {
                    await this.productHelper.increaseProductQuantity(carts);
                    this.ordersTransactionsService.updateOrder(orderId, { "transaction.error": error.response.data });
                    throw new InternalServerErrorException(Message.ERROR_OCCURRED());
                }),
            ),
        );
    };

    async uniqueTransaction(id: string, trackId: number, orderId: string) {
        const queryFilter = {
            $or: [
                {
                    $and: [
                        {
                            "transaction.id": id
                        },
                        {
                            orderId: { $ne: orderId }
                        }
                    ]
                },
                {
                    "transaction.trackId": trackId
                }
            ]
        }
        const order = await this.ordersTransactionsService.findOne(queryFilter);
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
            orderId: uuid(),
        } : null;
        return { userCart, transactionData };
    }

    getVerifyPaymentDto(verifyPaymentDto: VerifyPaymentDto, error: {
        error_code: number;
        error_message: string;
    } | null) {
        return {
            "transaction.status": verifyPaymentDto?.status,
            "transaction.trackId": verifyPaymentDto?.track_id,
            "transaction.cardNo": verifyPaymentDto?.card_no,
            "transaction.hashedCardNo": verifyPaymentDto?.hashed_card_no,
            "transaction.transactionDate": verifyPaymentDto?.date,
            "transaction.transactionAmount": verifyPaymentDto?.amount,
            "transaction.error": error,
        };
    }

    getTransactionData(verifyPaymentData: any) {
        return { 
            status: OrderStatus.WatingPay,
            "transaction.status": verifyPaymentData?.status,
            "transaction.paymentTrackId": verifyPaymentData?.payment?.track_id,
            "transaction.paymentAmount": verifyPaymentData?.payment?.amount,
            "transaction.paymentDate": verifyPaymentData?.payment?.date,
            "transaction.verifyDate": verifyPaymentData?.verify?.date,
          }
    }
}