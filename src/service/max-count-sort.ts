import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';
import { SortHelper } from 'src/app/products/helper/sort.helper';

@ValidatorConstraint({ name: 'IsPhoneAlreadyExist', async: true })
@Injectable()
export class MaxCountSort implements ValidatorConstraintInterface {
    constructor(private readonly sortHelper: SortHelper){}

    validate(sortIndex: number) {
      return this.sortHelper.sortCount() >= sortIndex;
    }

  defaultMessage() {
    return Message.INCORRECT(Name.SORT);
  }
}