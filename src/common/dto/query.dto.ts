import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, Min, Validate } from "class-validator";
import { MaxCountSort } from "src/service/max-count-sort";
import { Message } from "../message";
import { Name } from "../message/name";

export class QueryDto {
    @IsOptional()
    @IsBoolean({message: Message.INCORRECT(Name.DELETED_AT)})
    @Transform(({ value }) => value === 'true')
    deletedAt: boolean = false;

    @IsOptional()
    @Validate(MaxCountSort)
    @Min(0, {message: Message.INCORRECT(Name.SORT)})
    @IsNumber({}, {message: Message.INCORRECT(Name.SORT)})
    @Transform(({ value }) => Number(value))
    sort: number;
}