import { Transform } from "class-transformer";
import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString, Max, Min, Validate } from "class-validator";
import { Message } from "../message";
import { Name } from "../message/name";
import { Schema } from "mongoose";

export class QueryDto {
    @IsOptional()
    @IsBoolean({message: Message.INCORRECT(Name.DELETED_AT)})
    @Transform(({ value }) => value === 'true')
    deletedAt?: boolean = false;

    @IsOptional()
    @Max(100,{message: Message.INCORRECT(Name.SORT)})
    @Min(0, {message: Message.INCORRECT(Name.SORT)})
    @IsNumber({}, {message: Message.INCORRECT(Name.SORT)})
    @Transform(({ value }) => Number(value))
    sort?: number;

    @IsOptional()
    @Max(10000, {message: Message.INCORRECT(Name.PAGE_NUMBER)})
    @Min(1, {message: Message.INCORRECT(Name.PAGE_NUMBER)})
    @IsNumber({}, {message: Message.INCORRECT(Name.PAGE_NUMBER)})
    @Transform(({ value }) => Number(value))
    page?: number = 1;

    @IsOptional()
    @IsString()
    previousPage?: string;

    @IsOptional()
    @IsString()
    nextPage?: string;
  
    @IsOptional()
    @IsNumber({}, {message: Message.INCORRECT(Name.PAGE_COUNT)})
    @Transform(
        ({ value }) => {
            const limit = Number(value);
            if (limit < 10) { return 10; }
            if (limit > 50) { return 50; }
            return limit;
        }
    )
    limit?: number = 10;
}