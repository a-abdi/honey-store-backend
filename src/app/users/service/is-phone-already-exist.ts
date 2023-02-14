import { UsersService } from '../users.service';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUserPhoneAlreadyExist', async: true })
@Injectable()
export class IsPhoneAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) {}

    async validate(phoneNumber: string) {
      const user = await this.usersService.findByPhone(phoneNumber);
      return !user;
    }

  defaultMessage() {
    return 'شماره موبایل وارد شده قبلا ثبت شده است.';
  }
}