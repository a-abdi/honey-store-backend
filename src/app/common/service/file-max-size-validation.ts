import { Injectable, FileValidator } from '@nestjs/common';

@Injectable()
export class FileMaxSizeValidator extends FileValidator{
  constructor(protected readonly validationOptions: string | any) {
    super(validationOptions);
  }

  isValid(file:any) {
    return file.size < this.validationOptions.maxSize;
  }

  buildErrorMessage(file: any): string {
    return `حجم فایل ارسالی نباید بیش از ${this.validationOptions.maxSize} باشد`;
  }
}