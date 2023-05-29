import { IsArray, IsMongoId } from "class-validator";
import { Schema } from "mongoose";

export class AdminUpdateCommentDto {
    @IsArray()
    @IsMongoId({each: true})
    commentIdList: Schema.Types.ObjectId[];
}
