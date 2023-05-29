import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateCommentDto {
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
