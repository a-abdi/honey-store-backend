import { PropertyService } from '../property.service';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@ValidatorConstraint({ name: 'CheckLabelExist', async: true })
@Injectable()
export class CheckLabelExist implements ValidatorConstraintInterface {
    constructor(protected readonly propertyService: PropertyService) {}

    async validate(label: string, args: ValidationArguments) {
      const property = await this.propertyService.findOne({ label });
      if (args?.constraints[0]?.beExist) {
        return !!property
      }
      return !property;
    }

  defaultMessage() {
    return Message.ALREADY_EXIST(Name.LABEL);
  }
}