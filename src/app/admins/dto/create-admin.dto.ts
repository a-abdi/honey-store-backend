import { Transform } from "class-transformer";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, Matches, MinLength, Validate } from "class-validator";
import { Match } from "src/common/decorators/match.decolator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { IsPhoneAlreadyExist } from "../service/is-phone-already-exist";

export class CreateAdminDto {
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    @IsString({message: Message.MUST_BE_STRING(Name.NAME)})
    firstName: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.NAME)})
    @IsString({message: Message.MUST_BE_STRING(Name.LAST_NAME)})
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsEmail({},{message: Message.INCORRECT(Name.EMAIL)})
    @IsOptional()
    email: string;

    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD)})
    @MinLength(8, {message: Message.MAXIMUM_STRING(Name.PASSWORD, 8)})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.WEAK(Name.PASSWORD)})
    password: string;

    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD_CONFIRM)})
    @Match('password', {message: Message.NOT_MATCH()})
    passwordConfirm: string;
}
