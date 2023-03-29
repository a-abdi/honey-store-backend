import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";
import { CartProductDto } from "./cart-product";

export class CreateCartDto { 
    @IsArray({message: Message.MUST_BE_ARRAY(Name.PRODUCT)})
    @ValidateNested({ each: true })
    @Type(() => CartProductDto)
    products: CartProductDto[];
}
