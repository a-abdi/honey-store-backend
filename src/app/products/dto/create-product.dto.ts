import { Transform } from "class-transformer";
import { IsAlphanumeric, IsOptional, IsString } from "class-validator";
import { PersianLatinNumber } from "src/app/common/decorators/credit-number";
import { convertToEn } from "src/app/common/helper";

export class CreateProductDto {
    @IsString({message: `نام باید به صورت حروف وارد شود`})
    name: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای قیمت باید به صورت عدد وارد شود'})
    price: number;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تعداد باید به صورت عدد وارد شود'})
    quantity: number;

    @IsString({message: `توضیحات باید به صورت حروف وارد شود`})
    @IsOptional()
    description?: string;

    @IsAlphanumeric('en-US', {message: `کد به درستی وارد نشده است`})
    code: string;

    @Transform(({value}) => parseInt(convertToEn(value)))
    @PersianLatinNumber({message: 'مقدار وارد شده برای تخفیف باید به صورت عدد وارد شود'})
    discount?: number;
}
