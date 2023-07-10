import { Transform } from "class-transformer";
import { IsMongoId, IsNumber, IsOptional, Min, Validate } from "class-validator";
import { Schema } from "mongoose";
import { QueryDto } from "src/common/dto/query.dto";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { MaxCountSort } from "src/service/max-count-sort";

export class ProductQueryDto extends QueryDto {
  @IsOptional()
  @IsMongoId({message: Message.INCORRECT(Name.ID)})
  category?: Schema.Types.ObjectId;

  @IsOptional()
  @Validate(MaxCountSort)
  @Min(0, {message: Message.INCORRECT(Name.SORT)})
  @IsNumber({}, {message: Message.INCORRECT(Name.SORT)})
  @Transform(({ value }) => Number(value))
  sort?: number;
}