import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { Schema } from "mongoose";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { CheckLabelExist } from "../service/check-label-exist";

export class CreatePropertyDto {
    @IsString({message: Message.MUST_BE_STRING(Name.LABEL)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.LABEL)})
    @Validate(CheckLabelExist, [{ beExist: false }])
    label: string;

    @IsString({message: Message.MUST_BE_STRING(Name.TYPE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.TYPE)})
    type: string;

    @IsArray({message: Message.MUST_BE_ARRAY(Name.UNIT)})
    @IsString({message: Message.MUST_BE_STRING(Name.UNIT), each: true})
    @IsOptional()
    unit?: string[];

    @IsArray({message: Message.MUST_BE_ARRAY(Name.CATEGORY)})
    @IsMongoId({message: Message.INCORRECT(Name.CATEGORY), each: true})
    @IsOptional()
    category?: Schema.Types.ObjectId[];
}
