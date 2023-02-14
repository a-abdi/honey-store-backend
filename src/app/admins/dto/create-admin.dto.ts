import { Transform } from "class-transformer";
import { IsEmail, IsMobilePhone, IsOptional, IsString, Matches, MinLength, Validate } from "class-validator";
import { Match } from "src/app/common/decorators/match";
import { standardPhonNumber } from "src/app/common/helper";
import { IsPhoneAlreadyExist } from "../service/is-phone-already-exist";

export class CreateAdminDto {
    @IsString({message: 'نام باید به صورت حروف وارد شود'})
    firstName: string;

    @IsString({message: 'نام خانوادگی باید به صورت حروف وارد شود'})
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: 'فرمت شماره موبایل اشتباه است'})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsEmail({},{message: 'ایمیل به درستی وارد نشده است'})
    @IsOptional()
    email: string;

    @IsString({message: 'پسورد باید به صورت حروف وارد شود'})
    @MinLength(8, {message: 'پسورد باید حداقل ۸ کارکتر باشد'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'پسورد ضعیف است'})
    password: string;

    @IsString({message: 'تایید پسورد باید به صورت حروف وارد شود'})
    @Match('password', {message: 'تایید پسورد و پسورد با هم مطابقت ندارند'})
    passwordConfirm: string;
}
