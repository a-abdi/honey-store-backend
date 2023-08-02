import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { CreateTransactionInterFace } from '../orders/interface/interface';
import { AxiosError } from 'axios';
import { ParametersInterface } from './interface/parameter.interface';

@Injectable()
export class SmsService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async sendVerifyCode(mobile: string, parameters: ParametersInterface[], templateId: number = 100000) {
        const data = JSON.stringify({
            mobile,
            templateId,
            parameters
        });
        const url = this.configService.get<string>('SMS_VERIFY_URL');
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'text/plain',
            'x-api-key': this.configService.get<string>('SMS_X_API_KEY')
        };

        return await firstValueFrom(
            this.httpService.post<CreateTransactionInterFace>(url, data, { headers }).pipe(map((res) => res.data)).pipe(
                catchError(async (error: AxiosError) => {
                    console.log(error);
                    
                    // this.productHelper.increaseProductQuantity(order.cart);
                    // this.ordersTransactionsService.updateOrder(orderId, { "transaction.error": error.response?.data || error.message });
                    // throw new InternalServerErrorException(Message.ERROR_OCCURRED());
                }),
            ),
        );


    }
}
