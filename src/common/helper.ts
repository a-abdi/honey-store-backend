import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from 'uuid';
import { IsMobilePhone } from 'class-validator';
import { IsMongoId } from 'class-validator';
import { Message } from "./message";
import { Name } from "./message/name";

export class MongoIdParams {
  @IsMongoId({message: Message.INCORRECT(Name.ID)})
  _id: string;
}

export class PhoneNumberParams {
  @IsMobilePhone(['fa-IR'],{}, {message: Message.INCORRECT_FORMAT(Name.PHONE_NUMBER)})
  phoneNumber: string;
}

export const standardPhonNumber = (phoneNumber: string) => phoneNumber.replace(/^0/, '+98');

export const fileStorage = (destination: string) => diskStorage({
  destination,
  filename: (req, file, cb) => {
    const randomName: string = uuid();
    cb(null, `${randomName}${extname(file.originalname)}`);
  }
});

const PERSIAN_NUMBER = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
export const convertToEn = (str: string) =>
{
  for(let i=0; i<10; i++)
  {
    const strNumber: string = `${i}`;
    str = str.replace(PERSIAN_NUMBER[i], strNumber);
  }
  
  return str;
};