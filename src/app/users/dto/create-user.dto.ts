import { Transform } from "class-transformer";
import { IsMobilePhone, IsOptional, IsPostalCode, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { IsPhoneAlreadyExist } from "src/app/users/service/is-phone-already-exist";
import { Match } from "src/common/decorators/match.decolator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreateUserDto {
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.NAME, 2)})
    @MaxLength(60, {message: Message.MAXIMUM_STRING(Name.NAME, 60)})
    @IsOptional()
    firstName: string;

    @IsString({message: Message.MUST_BE_STRING(Name.LAST_NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.LAST_NAME, 2)})
    @MaxLength(80, {message: Message.MAXIMUM_STRING(Name.NAME, 80)})
    @IsOptional()
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsString({message: Message.MUST_BE_STRING(Name.ADDRESS)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.ADDRESS, 8)})
    @MaxLength(300, {message: Message.MAXIMUM_STRING(Name.ADDRESS, 300)})
    @IsOptional()
    address: string;

    @IsString({message: Message.MUST_BE_STRING(Name.POSTAL_CODE)})
    @IsPostalCode(['IR'], {message: Message.INCORRECT(Name.POSTAL_CODE)})
    @Transform(({value}) => value.replace('-', ''))
    @IsOptional()
    postalCode: string;

    @IsString({message: Message.MUST_BE_STRING(Name.CITY)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.CITY, 2)})
    @MaxLength(100, {message: Message.MAXIMUM_STRING(Name.CITY, 100)})
    @IsOptional()
    city: string;

    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.PASSWORD, 8)})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.WEAK(Name.PASSWORD)})
    @IsOptional()
    password: string;

    @Match('password', {message: Message.NOT_MATCH()})
    passwordConfirm: string;
}
