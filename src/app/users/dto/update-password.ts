import { IsString, Matches, MinLength } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { Match } from "src/common/decorators/match.decolator";

export class UpdatePasswordDto {
    @IsString({message: Message.MUST_BE_STRING(Name.PASSWORD)})
    @MinLength(8, {message: Message.INCORRECT(Name.PASSWORD)})
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.INCORRECT(Name.PASSWORD)})
    password?: string;

    @IsString({message: Message.MUST_BE_STRING(Name.NEW_PASSWORD)})
    @MinLength(8, {message: Message.MINIMUM_STRING(Name.NEW_PASSWORD, 8)})
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: Message.WEAK(Name.NEW_PASSWORD)})
    newPassword?: string;

    @Match('newPassword', {message: Message.NOT_MATCH()})
    newPasswordConfirm?: string;
}