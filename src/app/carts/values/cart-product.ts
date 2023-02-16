import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { PersianLatinNumber } from 'src/common/decorators/credit-number.decorator';
import { convertToEn } from 'src/common/helper';
import { Message } from 'src/common/message';

export class CartProduct {
    @IsMongoId({message: Message.INVALID_MONGO_ID()})
    product: Schema.Types.ObjectId;

    @IsString({message: Message.IS_STRING('نام کالا')})
    name: string;

    @IsString()
    imageSrc: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تعداد باید به صورت عدد وارد شود'})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تخفیف باید به صورت عدد وارد شود'})
    discount: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تعداد باید به صورت عدد وارد شود'})
    quantity: number;
}