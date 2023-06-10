import { IsBoolean, IsBooleanString, IsMongoId, IsOptional } from "class-validator";
import { Schema } from "mongoose";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class ProductQueryDto {
  @IsOptional()
  @IsMongoId({message: Message.INCORRECT(Name.ID)})
  category: Schema.Types.ObjectId;

  @IsOptional()
  @IsBooleanString()
  deletedAt: boolean;
}