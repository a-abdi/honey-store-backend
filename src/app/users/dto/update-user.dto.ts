import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { AddressUserDto } from "./address-user-dto";

export class UpdateUserDto {
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

    @IsDefined({message: Message.SHOULD_BE_DEFINED(Name.ADDRESS)})
    @IsNotEmptyObject({}, {message: Message.NOT_BE_EMPTY(Name.ADDRESS)})
    @IsObject({message: Message.INCORRECT(Name.ADDRESS)})
    @ValidateNested({ each: true })
    @Type(() => AddressUserDto)
    @IsOptional()
    address: AddressUserDto;
}
