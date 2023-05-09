import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { CartsService } from '../carts/carts.service';
import { createRandomCode } from 'src/common/helper';
import { getAmount } from './helper/get-amount.helper';
import { getCartProduct } from './helper/get-cart-product.helper';
import { OrderPaymentInterface } from './interface/interface';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';

@Controller()
export class OrdersPaymentsController {
  constructor(
    private readonly ordersPaymentsService: OrdersPaymentsService,
    private readonly cartHelper: CartHelper,
    private readonly productHelper: ProductHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkout/payment')
  async checkoutPayement(@User() user: AuthUserInfo) {
    const carts = await this.cartHelper.removeUserCartGetValue(user);

    if (carts) {
      const orderPayment: OrderPaymentInterface = {
        amount: getAmount(carts),
        cart: getCartProduct(carts),
        userId: user.userId,
        code: createRandomCode(),
      };
      this.ordersPaymentsService.createOrder(orderPayment);
      this.productHelper.decreaseProductQuantity(carts);
    }

    return carts;
  }
}
