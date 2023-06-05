import { IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

export class VerifyPaymentDto {
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
    order_id: string;

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
