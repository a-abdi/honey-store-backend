import { IsNumber, IsOptional, IsString, MaxLength, min, MinLength } from "class-validator";
import { Schema } from "mongoose";
import { Message } from "src/common/message";
import { Name } from "src/common/message/name";

export class CreateOrderPaymentDto {
    // @MinLength(3, { message: Message.MINIMUM_STRING(Name.NAME, 3) })
    // @MaxLength(50, { message: Message.MAXIMUM_STRING(Name.NAME, 50) })
    // @IsNumber()
    @IsString()
    @IsOptional()
    status: number;

    // @IsNumber()
    @IsString()
    @IsOptional()
    track_id: number;

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    order_id: Schema.Types.ObjectId;

    // @IsNumber()
    @IsString()

    @IsOptional()
    amount: number;

    @IsString()
    @IsOptional()
    card_no: string;

    @IsString()
    @IsOptional()
    hashed_card_no: string;

    @IsString()
    @IsOptional()
    date: string;
}
