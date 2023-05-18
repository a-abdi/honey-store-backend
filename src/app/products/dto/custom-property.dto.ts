import { OmitType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from 'src/app/property/dto/create-property.dto';
import { IsAlphanumeric, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';
import { CheckLabelExist } from 'src/app/property/service/check-label-exist';

export class CustomPropertyDto extends OmitType(CreatePropertyDto, ['category', "label"]) {
    @IsAlphanumeric()
    @IsOptional()
    value: string;
    
    @IsString({message: Message.MUST_BE_STRING(Name.LABEL)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.LABEL)})
    @Validate(CheckLabelExist, [{ beExist: true }], {message: Message.NOT_EXIST(Name.LABEL)} )
    label: string;

    @IsString()
    @IsOptional()
    code: string;
}
