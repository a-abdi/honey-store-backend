import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderPaymentDto } from './create-orders-payment.dto';

export class UpdateOrderPaymentDto extends PartialType(CreateOrderPaymentDto) {}
