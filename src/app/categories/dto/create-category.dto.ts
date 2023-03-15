import { IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreateCategoryDto {
    @MinLength(3, { message: Message.MINIMUM_STRING(Name.NAME, 3) })
    @MaxLength(50, { message: Message.MAXIMUM_STRING(Name.NAME, 50) })
    @IsString({ message: Message.MUST_BE_STRING(Name.NAME) })
    name: string;

    @IsString({ message: Message.MUST_BE_STRING(Name.DESCRIPTION) })
    @IsOptional()
    description: string;
}
