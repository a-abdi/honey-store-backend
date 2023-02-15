import { Transform } from "class-transformer";
import { IsMobilePhone, IsOptional, IsPostalCode, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { IsPhoneAlreadyExist } from "src/app/users/service/is-phone-already-exist";
import { Match } from "src/common/decorators/match.decolator";
import { standardPhonNumber } from "src/common/helper";

export class CreateUserDto {
    @IsString({message: 'نام باید به صورت حروف وارد شود'})
    @MinLength(2, {message: 'نام باید حداقل ۲ کارکتر باشد'})
    @MaxLength(60, {message: 'نام باید حداکثر 60 کارکتر باشد'})
    @IsOptional()
    firstName: string;

    @IsString({message: 'نام خانوادگی باید به صورت حروف وارد شود'})
    @MinLength(2, {message: 'نام خانوادگی باید حداقل 2 کارکتر باشد'})
    @MaxLength(80, {message: 'نام خانوادگی باید حداکثر 80 کارکتر باشد'})
    @IsOptional()
    lastName: string;

    @Transform(({ value }) => standardPhonNumber(value))
    @IsMobilePhone(['fa-IR'],{}, {message: 'فرمت شماره موبایل اشتباه است'})
    @Validate(IsPhoneAlreadyExist)
    phoneNumber: string;

    @IsString({message: 'آدرس باید به صورت حروف وارد شود'})
    @MinLength(2, {message: 'حداقل طول آدرس باید ۲ کارکتر باشد'})
    @MaxLength(300, {message: 'طول آدرس بیش از حد مجاز'})
    @IsOptional()
    address: string;

    @IsString({message: 'کد پستی باید به صورت حروف وارد شود'})
    @IsPostalCode(['IR'], {message: `کد پستی به درستی وارد نشده است`})
    @Transform(({value}) => value.replace('-', ''))
    @IsOptional()
    postalCode: string;

    @IsString({message: 'شهر باید به صورت حروف وارد شود'})
    @MinLength(2, {message: 'شهر باید حداقل ۲ کارکتر باشد'})
    @MaxLength(100, {message: 'شهر باید حداکثر 100 کارکتر باشد'})
    @IsOptional()
    city: string;

    @IsString({message: 'پسورد باید به صورت حروف وارد شود'})
    @MinLength(8, {message: 'پسورد باید حداقل ۸ کارکتر باشد'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'پسورد ضعیف است'})
    @IsOptional()
    password: string;

    @Match('password', {message: 'تایید پسورد و پسورد با هم مطابقت ندارند'})
    passwordConfirm: string;
}
