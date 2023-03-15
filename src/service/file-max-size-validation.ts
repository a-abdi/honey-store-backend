import { Injectable, FileValidator } from '@nestjs/common';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';

@Injectable()
export class FileMaxSizeValidator extends FileValidator{
  constructor(protected readonly validationOptions: string | any) {
    super(validationOptions);
  }

  isValid(file:any) {
    return file.size < this.validationOptions.maxSize;
  }

  buildErrorMessage(file: any): string {
    return  Message.MAXIMUM_VOLUME_FILE(Name.PRODUCT, this.validationOptions.maxSize);
  }
}