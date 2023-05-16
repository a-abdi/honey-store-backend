import { Transform } from "class-transformer";
import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";
import { PersianLatinNumber } from "src/common/decorators/credit-number.decorator";
import { convertToEn } from "src/common/helper";
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

export class CreateProductDto {
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    name: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.PRICE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PRICE)})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.QUANTITY)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.QUANTITY)})
    quantity: number;

    @IsString({message: Message.MUST_BE_STRING(Name.DESCRIPTION)})
    @IsOptional()
    description?: string;

    @IsAlphanumeric('en-US', {message: Message.INCORRECT(Name.CODE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.CODE)})
    code: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.DISCOUNT)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.DISCOUNT)})
    discount?: number;

    @IsMongoId({message: Message.INCORRECT(Name.CATEGORY)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.CATEGORY)})
    category: Schema.Types.ObjectId;
}
