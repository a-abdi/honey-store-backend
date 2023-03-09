import { IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";

export class CreateCategoryDto {
    @MinLength(3, { message: 'نام نباید کمتر از ۳ حرف باشد.' })
    @MaxLength(50, { message: 'نام نباید بیشتر از 50 حرف باشد.' })
    @IsString({ message: 'نام باید به صورت حروف وارد شود.' })
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}
