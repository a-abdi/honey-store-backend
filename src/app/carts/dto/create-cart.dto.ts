import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDefined, IsIP, IsMongoId, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { CartProduct } from "../values/cart-product";

export class CreateCartDto { 
    @IsIP(4, {message: Message.INVALID_IP_V4()})
    userIp: string;

    @IsMongoId({message: Message.INVALID_MONGO_ID(Name.USER)})
    @IsOptional()
    userId: string;

    @IsDefined({message: Message.SHOULD_BE_DEFINED(Name.PRODUCT)})
    @IsNotEmptyObject({}, {message: Message.NOT_BE_EMPTY(Name.PRODUCT)})
    @IsObject({message: Message.MUST_BE_OBJECT(Name.PRODUCT)})
    @ValidateNested()
    @Type(() => CartProduct)
    product: CartProduct;

    @IsBoolean()
    @IsOptional()
    isBought: boolean;
}
