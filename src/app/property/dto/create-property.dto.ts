import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreatePropertyDto {
    @IsString({message: Message.MUST_BE_STRING(Name.LABEL)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.LABEL)})
    label: string;

    @IsString({message: Message.MUST_BE_STRING(Name.TYPE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.TYPE)})
    type: string;

    @IsString({message: Message.MUST_BE_STRING(Name.UNIT)})
    unit: string;

    @IsMongoId({message: Message.INCORRECT(Name.CATEGORY)})
    category: Schema.Types.ObjectId;
}
