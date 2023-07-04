import { Transform } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class OrderQueryDto {
    @IsOptional()
    @Max(5, {message: Message.MAXIMUM_NUMBER(Name.STATUS, 5)})
    @Min(0, {message: Message.MINIMUM_NUMBER(Name.STATUS, 0)})
    @IsNumber({allowNaN: false, allowInfinity: false}, { message: Message.MUST_BE_NUMBER(Name.STATUS) })
    @Transform(({ value }) => Number(value))
    status?: number;
  }