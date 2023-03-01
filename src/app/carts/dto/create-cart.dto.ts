import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { CartProductDto } from "./cart-product";

export class CreateCartDto { 
    @IsDefined({message: Message.SHOULD_BE_DEFINED(Name.PRODUCT)})
    @IsNotEmptyObject({}, {message: Message.NOT_BE_EMPTY(Name.PRODUCT)})
    @IsObject({message: Message.MUST_BE_OBJECT(Name.PRODUCT)})
    @ValidateNested({ each: true })
    @Type(() => CartProductDto)
    product: CartProductDto;
}
