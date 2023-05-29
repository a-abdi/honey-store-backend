import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";
import { Schema } from "mongoose";

export class CreateViewpointDto {
    @MaxLength(25)
    @IsOptional()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    text: string;

    @Min(1)
    @Max(5)
    @IsOptional()
    @IsNumber()
    score: number;
}
