import { Transform } from "class-transformer";
import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PersianLatinNumber } from "src/common/decorators/credit-number.decorator";
import { convertToEn } from "src/common/helper";
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

export class CreateProductDto {
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    name: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PRICE)})
    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.PRICE)})
    price: number;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.QUANTITY)})
    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.QUANTITY)})
    quantity: number;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.DESCRIPTION)})
    @IsOptional()
    description?: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.CODE)})
    @IsAlphanumeric('en-US', {message: Message.INCORRECT(Name.CODE)})
    code: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.DISCOUNT)})
    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: Message.MUST_BE_NUMBER(Name.DISCOUNT)})
    discount?: number;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.CATEGORY)})
    @IsMongoId({message: Message.INCORRECT(Name.CATEGORY)})
    category: string;
}
