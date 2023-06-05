import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreateCommentDto {
    @MaxLength(25, {message: Message.MAXIMUM_STRING(Name.TITLE, 25)})
    @IsOptional()
    @IsString({message: Message.MUST_BE_STRING(Name.TITLE)})
    title: string;

    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.TEXT)})
    @IsString({message: Message.MUST_BE_STRING(Name.TEXT)})
    text: string;

    @Min(1, {message: Message.MAXIMUM_NUMBER(Name.SCORE, 1)})
    @Max(5, {message: Message.MAXIMUM_NUMBER(Name.SCORE, 5)})
    @IsOptional()
    @IsNumber({}, {message: Message.MUST_BE_NUMBER(Name.SCORE)})
    score: number;
}
