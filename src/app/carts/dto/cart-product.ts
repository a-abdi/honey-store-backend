import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Schema } from 'mongoose';
import { PersianLatinNumber } from 'src/common/decorators/credit-number.decorator';
import { convertToEn } from 'src/common/helper';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

export class CartProductDto {
    @IsMongoId({message: Message.INVALID_MONGO_ID()})
    _id: Schema.Types.ObjectId;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    name: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    @IsString({message: Message.MUST_BE_STRING(Name.IMAGE_SRC)})
    imageSrc: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PRICE)})
    @Transform(({value}) => parseInt(convertToEn(value.toString())))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.PRICE)})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value.toString())))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.DISCOUNT)})
    discount: number;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.QUANTITY)})
    @Transform(({value}) => parseInt(convertToEn(value.toString())))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.QUANTITY)})
    quantity: number;
}
