import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { PersianLatinNumber } from 'src/common/decorators/credit-number.decorator';
import { convertToEn } from 'src/common/helper';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

export class CartProduct {
    @IsMongoId({message: Message.INVALID_MONGO_ID()})
    product: Schema.Types.ObjectId;

    @IsString({message: Message.IS_STRING(Name.PRODUCT_NAME)})
    name: string;

    @IsString({message: Message.IS_STRING(Name.IMAGE_SRC)})
    imageSrc: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.PRICE)})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.DISCOUNT)})
    discount: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.QUANTITY)})
    quantity: number;
}