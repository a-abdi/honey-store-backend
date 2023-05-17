import { PropertyService } from '../property.service';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@ValidatorConstraint({ name: 'CheckLabelExist', async: true })
@Injectable()
export class CheckLabelExist implements ValidatorConstraintInterface {
    constructor(protected readonly propertyService: PropertyService) {}

    async validate(label: string) {
      const property = await this.propertyService.findOne({ label });
      return !property;
    }

  defaultMessage() {
    return Message.ALREADY_EXIST(Name.LABEL);
  }
}