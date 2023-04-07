import { Transform, Type } from "class-transformer";
import { IsDefined, IsMobilePhone, IsNotEmptyObject, IsObject, IsOptional, IsString, Matches, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { IsPhoneAlreadyExist } from "src/app/users/service/is-phone-already-exist";
import { Match } from "src/common/decorators/match.decolator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { AddressUserDto } from "./address-user-dto";

export class CreateUserDto {
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.NAME, 2)})
    @MaxLength(60, {message: Message.MAXIMUM_STRING(Name.NAME, 60)})
    @IsOptional()
    firstName: string;

    @IsString({message: Message.MUST_BE_STRING(Name.LAST_NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.LAST_NAME, 2)})
    @MaxLength(80, {message: Message.MAXIMUM_STRING(Name.LAST_NAME, 80)})
    @IsOptional()
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsDefined({message: Message.SHOULD_BE_DEFINED(Name.ADDRESS)})
    @IsNotEmptyObject({}, {message: Message.NOT_BE_EMPTY(Name.ADDRESS)})
    @IsObject({message: Message.INCORRECT(Name.ADDRESS)})
    @ValidateNested({ each: true })
    @Type(() => AddressUserDto)
    @IsOptional()
    address: AddressUserDto;

    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.PASSWORD, 8)})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.WEAK(Name.PASSWORD)})
    @IsOptional()
    password: string;

    @Match('password', {message: Message.NOT_MATCH()})
    passwordConfirm: string;
}
