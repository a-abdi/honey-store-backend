import { Transform } from "class-transformer";
import { IsBooleanString, IsNumber, IsOptional, Min, Validate } from "class-validator";
import { MaxCountSort } from "src/service/max-count-sort";
import { Message } from "../message";
import { Name } from "../message/name";

export class QueryDto {
    @IsOptional()
    @IsBooleanString({message: Message.INCORRECT(Name.DELETED_AT)})
    deletedAt: boolean;

    @IsOptional()
    @Validate(MaxCountSort)
    @Min(0, {message: Message.INCORRECT(Name.SORT)})
    @IsNumber({}, {message: Message.INCORRECT(Name.SORT)})
    @Transform(({ value }) => Number(value) )
    sort: number;
}