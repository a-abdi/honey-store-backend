import { Transform } from "class-transformer";
import { IsMobilePhone, IsString, Matches, MinLength, Validate } from "class-validator";
import { IsPhoneAlreadyExist } from "src/app/users/service/is-phone-already-exist";
import { Match } from "src/common/decorators/match.decolator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreateUserDto {
    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.PASSWORD, 8)})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.WEAK(Name.PASSWORD)})
    password: string;

    @Match('password', {message: Message.NOT_MATCH()})
    passwordConfirm: string;
}
