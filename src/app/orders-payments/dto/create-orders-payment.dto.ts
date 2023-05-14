import { IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class CreateOrderPaymentDto {
    @IsString()
    @IsOptional()
    status: number;

    @IsString()
    @IsOptional()
    track_id: number;

    @IsString()
    @IsOptional()
    id: string;

    @IsString()
    @IsOptional()
    order_id: Schema.Types.ObjectId;

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
