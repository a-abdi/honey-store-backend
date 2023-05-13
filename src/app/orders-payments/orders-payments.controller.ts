import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { OrdersPaymentsService } from './orders-payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { createRandomCode } from 'src/common/helper';
import { getAmount } from './helper/get-amount.helper';
import { getCartProduct } from './helper/get-cart-product.helper';
import { OrderPaymentInterface, PaymentInterface } from './interface/interface';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';
import { PaymentHelper } from './helper/payment.helper';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';

@ResponseMessage(Message.SUCCESS())
@Controller()
export class OrdersPaymentsController {
  constructor(
    private readonly ordersPaymentsService: OrdersPaymentsService,
    private readonly cartHelper: CartHelper,
    private readonly productHelper: ProductHelper,
    private readonly paymentHelper: PaymentHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkout/payment')
  async checkoutPayement(@User() user: AuthUserInfo) {
    const carts = await this.cartHelper.removeUserCartGetValue(user);
    let transactionLink = null;
    if (carts) {
      const orderPayment: OrderPaymentInterface = {
        amount: getAmount(carts),
        cart: getCartProduct(carts),
        user: user.userId,
        code: createRandomCode(),
      };
      const order = await this.ordersPaymentsService.createOrder(orderPayment);
      await this.productHelper.decreaseProductQuantity(carts);
      const transaction = await this.paymentHelper.createTransaction(user, order);
      const payment: PaymentInterface = {
        transactionId: transaction.id,
        transactionLink: transaction.link,
      };
      await this.ordersPaymentsService.updateOrder(order.id, { payment });
      transactionLink = transaction.link;
    }
    
    return {
      transactionLink
    };
  }
}
