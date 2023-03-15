import { AdminsService } from '../admins.service';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@ValidatorConstraint({ name: 'IsPhoneAlreadyExist', async: true })
@Injectable()
export class IsPhoneAlreadyExist implements ValidatorConstraintInterface {
    constructor(protected readonly adminsService: AdminsService) {}

    async validate(phone: string) {
      const admin = await this.adminsService.findByPhone(phone);
      return !admin;
    }

  defaultMessage() {
    return Message.ALREADY_EXIST(Name.PHONE_NUMBER);
  }
}