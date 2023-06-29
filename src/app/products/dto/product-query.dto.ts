import { IsMongoId, IsOptional } from "class-validator";
import { Schema } from "mongoose";
import { QueryDto } from "src/common/dto/query.dto";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class ProductQueryDto extends QueryDto {
  @IsOptional()
  @IsMongoId({message: Message.INCORRECT(Name.ID)})
  category?: Schema.Types.ObjectId;
}