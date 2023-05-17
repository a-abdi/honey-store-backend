import { OmitType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from 'src/app/property/dto/create-property.dto';
import { Schema } from 'mongoose';
import { IsAlphanumeric, IsOptional } from 'class-validator';

export class CustomPropertyDto extends OmitType(CreatePropertyDto, ['category']) {
    @IsAlphanumeric()
    @IsOptional()
    value: Schema.Types.Mixed;
}
