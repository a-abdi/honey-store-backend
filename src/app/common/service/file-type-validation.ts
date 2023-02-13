import { Injectable, FileValidator } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileTypeValidator extends FileValidator{
  constructor(protected readonly validationOptions: string | any) {
    super(validationOptions);
  }

  isValid(file:any) {
    const fileExtention = extname(file.originalname).slice(1);
    return this.validationOptions.validType.includes(fileExtention);
  }

  buildErrorMessage(file: any): string {
    return `فرمت فایل ارسالی معتبر نیست`;
  }
}