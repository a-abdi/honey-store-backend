import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';
import { CategoriesService } from '../categories.service';

@ValidatorConstraint({ name: 'CategoryNameUnique', async: true })
@Injectable()
export class CategoryNameUnique implements ValidatorConstraintInterface {
    constructor(protected readonly categoryService: CategoriesService) {}

    async validate(name: string) {
      const category = await this.categoryService.findByName(name);
      return !category;
    }

  defaultMessage() {
    return Message.ALREADY_EXIST(Name.NAME);
  }
}