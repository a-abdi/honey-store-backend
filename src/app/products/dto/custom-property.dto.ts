import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';
import { CheckLabelExist } from 'src/app/property/service/check-label-exist';

export class CustomPropertyDto {
    @IsOptional()
    value: string | number;
    
    @IsString({message: Message.MUST_BE_STRING(Name.LABEL)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.LABEL)})
    @Validate(CheckLabelExist, [{ beExist: true }], {message: Message.NOT_EXIST(Name.LABEL)} )
    label: string;

    @IsString({message: Message.MUST_BE_STRING(Name.TYPE)})
    @IsNotEmpty({message: Message.NOT_BE_EMPTY(Name.TYPE)})
    type: string;

    @IsString({message: Message.MUST_BE_STRING(Name.UNIT)})
    @IsOptional()
    unit: string;
}
