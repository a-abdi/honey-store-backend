import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class SearchDto extends QueryDto {
  @IsOptional()
  @IsString()
  q?: string;
}