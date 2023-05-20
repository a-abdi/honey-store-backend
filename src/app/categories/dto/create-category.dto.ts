import { IsArray, IsMongoId, IsOptional, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { Schema } from "mongoose";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { CategoryNameUnique } from "../service/category-name-unique";

export class CreateCategoryDto {
    @MinLength(3, { message: Message.MINIMUM_STRING(Name.NAME, 3) })
    @MaxLength(50, { message: Message.MAXIMUM_STRING(Name.NAME, 50) })
    @IsString({ message: Message.MUST_BE_STRING(Name.NAME) })
    @Validate(CategoryNameUnique)
    name: string;

    @IsString({ message: Message.MUST_BE_STRING(Name.DESCRIPTION) })
    @IsOptional()
    description: string;

    @IsArray({ message: Message.MUST_BE_ARRAY(Name.PROPERTIES) })
    @IsMongoId({message: Message.INCORRECT(Name.PROPERTIES), each: true})
    @IsOptional()
    properties: Schema.Types.ObjectId[];
}
