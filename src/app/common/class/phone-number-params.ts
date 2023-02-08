import { IsMobilePhone } from 'class-validator';

export class PhoneNumberParams {
    @IsMobilePhone(['fa-IR'],{}, {message: 'فرمت شماره موبایل اشتباه است'})
    phoneNumber: string;
}
