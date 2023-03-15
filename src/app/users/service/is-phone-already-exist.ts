import { UsersService } from '../users.service';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@ValidatorConstraint({ name: 'IsUserPhoneAlreadyExist', async: true })
@Injectable()
export class IsPhoneAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) {}

    async validate(phoneNumber: string) {
      const user = await this.usersService.findByPhone(phoneNumber);
      return !user;
    }

  defaultMessage() {
    return Message.ALREADY_EXIST(Name.PHONE_NUMBER);
  }
}