import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryQueryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  nanme: string;
}