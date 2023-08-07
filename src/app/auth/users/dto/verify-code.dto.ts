import { Transform } from "class-transformer";
import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";
import { standardPhonNumber } from "src/common/helper";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class VerifyCodeDto {
    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.PHONE_NUMBER)})
    phoneNumber: string;

    @IsString({message: Message.MUST_BE_STRING(Name.VERIFY_CODE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.VERIFY_CODE)})
    code: string;
}
