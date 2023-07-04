import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsOptional, Max, Min } from "class-validator";
import { DayOf, OrderStatus } from "src/common/declare/enum";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class ChartQueryDto {
    @IsOptional()
    @Max(5, {message: Message.MAXIMUM_NUMBER(Name.STATUS, 5)})
    @Min(0, {message: Message.MINIMUM_NUMBER(Name.STATUS, 0)})
    @IsNumber({allowNaN: false, allowInfinity: false}, { message: Message.MUST_BE_NUMBER(Name.STATUS) })
    @Transform(({ value }) => Number(value))
    status?: OrderStatus = OrderStatus.Delivered;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    sDate?: Date = new Date(new Date().setDate(new Date().getDate() - 30));

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    eDate?: Date = new Date();

    @IsOptional()
    @Max(1)
    @Min(0)
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Transform(({ value }) => Number(value))
    m?: number = 1;

    @IsOptional()
    @Max(1)
    @Min(0)
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Transform(({ value }) => Number(value))
    y?: number = 1;

    @IsOptional()
    @Max(3)
    @Min(0)
    @IsNumber({allowNaN: false, allowInfinity: false})
    @Transform(({ value }) => Number(value))
    d?: DayOf = DayOf.Month;
  }