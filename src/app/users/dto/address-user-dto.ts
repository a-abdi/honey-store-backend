import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsPostalCode, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { RecipientUserDto } from "./recipient-user-dto";

export class AddressUserDto {
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PROVINCE)})
    @IsString({message: Message.MUST_BE_STRING(Name.PROVINCE)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.PROVINCE, 2)})
    @MaxLength(40, {message: Message.MAXIMUM_STRING(Name.PROVINCE, 40)})
    province: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.CITY)})
    @IsString({message: Message.MUST_BE_STRING(Name.CITY)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.CITY, 2)})
    @MaxLength(100, {message: Message.MAXIMUM_STRING(Name.CITY, 100)})
    city: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PLAQUE)})
    @IsString({message: Message.MUST_BE_STRING(Name.PLAQUE)})
    @MinLength(1, {message: Message.MINIMUM_STRING(Name.PLAQUE, 1)})
    @MaxLength(5, {message: Message.MAXIMUM_STRING(Name.PLAQUE, 5)})
    plaque: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.POSTAL_ADDRESS)})
    @IsString({message: Message.MUST_BE_STRING(Name.POSTAL_ADDRESS)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.POSTAL_ADDRESS, 8)})
    @MaxLength(300, {message: Message.MAXIMUM_STRING(Name.POSTAL_ADDRESS, 300)})
    postalAddress: string;

    @IsDefined({message: Message.SHOULD_BE_DEFINED(Name.RECIPIENT)})
    @IsNotEmptyObject({}, {message: Message.NOT_BE_EMPTY(Name.RECIPIENT)})
    @IsObject({message: Message.INCORRECT(Name.RECIPIENT)})
    @ValidateNested({ each: true })
    @Type(() => RecipientUserDto)
    recipient: RecipientUserDto;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.POSTAL_CODE)})
    @IsString({message: Message.MUST_BE_STRING(Name.POSTAL_CODE)})
    @IsPostalCode(['IR'], {message: Message.INCORRECT(Name.POSTAL_CODE)})
    @Transform(({value}) => value.replace('-', ''))
    postalCode: string;

    @IsBoolean()
    selected: boolean;
};

