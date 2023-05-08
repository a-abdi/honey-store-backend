import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { CartsService } from '../carts/carts.service';
import { createRandomCode } from 'src/common/helper';
import { getAmount } from './helper/get-amount';
import { getCartProduct } from './helper/get-cart-product';
import { OrderPaymentInterface } from './helper/interface';

@Controller()
export class OrdersPaymentsController {
  constructor(
    private readonly ordersPaymentsService: OrdersPaymentsService,
    private readonly cartService: CartsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkout/payment')
  async checkoutPayement(@User() user: AuthUserInfo) {
    const opt = { new: true };
    const carts = await (await this.cartService.remove(user, opt))?.populate({
      path: 'products', populate: {
        path: '_id',
        model: 'Product'
      }
    });

    if (carts) {
      const orderPayment: OrderPaymentInterface = {
        amount: getAmount(carts),
        cart: getCartProduct(carts),
        userId: user.userId,
        code: createRandomCode(),
      };
      this.ordersPaymentsService.createOrder(orderPayment);
    }

    return carts;
  }
}
