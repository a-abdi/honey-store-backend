import { Injectable, FileValidator } from '@nestjs/common';
import { extname } from 'path';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@Injectable()
export class FileTypeValidator extends FileValidator{
  constructor(protected readonly validationOptions: string | any) {
    super(validationOptions);
  }

  isValid(file:any) {
    const fileExtention = extname(file.originalname).slice(1);
    return this.validationOptions.validType.includes(fileExtention);
  }

  buildErrorMessage(): string {
    return Message.INCORRECT_FORMAT(Name.FILE);
  }
}