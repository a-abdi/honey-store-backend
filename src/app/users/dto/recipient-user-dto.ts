
import { Transform } from "class-transformer";
import { IsMobilePhone, IsString, MaxLength, MinLength } from "class-validator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class RecipientUserDto {
    @IsString({message: Message.MUST_BE_STRING(Name.RECIPIENT_NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.RECIPIENT_NAME, 2)})
    @MaxLength(60, {message: Message.MAXIMUM_STRING(Name.RECIPIENT_NAME, 60)})
    firstName: string;

    @IsString({message: Message.MUST_BE_STRING(Name.RECIPIENT_LAST_NAME)})
    @MinLength(2, {message: Message.MINIMUM_STRING(Name.RECIPIENT_LAST_NAME, 2)})
    @MaxLength(80, {message: Message.MAXIMUM_STRING(Name.RECIPIENT_LAST_NAME, 80)})
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.RECIPIENT_PHONE_NUMBER)})
    phoneNumber: string;
}

