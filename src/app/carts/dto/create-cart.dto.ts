import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsIP, IsMongoId, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { CartProduct } from "../values/cart-product";

export class CreateCartDto { 
    @IsIP(4, {message: Message.INVALID_IP_V4()})
    userIp: string;

    @IsMongoId({message: Message.INVALID_MONGO_ID('کاربر')})
    @IsOptional()
    userId: string;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CartProduct)
    products: CartProduct;

    @IsBoolean()
    @IsOptional()
    isBought: boolean;
}
