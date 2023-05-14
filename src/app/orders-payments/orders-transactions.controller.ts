import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { OrdersTransactionsService } from './orders-transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { createRandomCode } from 'src/common/helper';
import { getAmount } from './helper/get-amount.helper';
import { getCartProduct } from './helper/get-cart-product.helper';
import { OrderTransactionInterface, TransactionInterface } from './interface/interface';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';
import { TransactionHelper } from './helper/transaction.helper';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';
import { CreateOrderPaymentDto } from './dto/create-orders-payment.dto';
import { Response } from 'express';

@ResponseMessage(Message.SUCCESS())
@Controller()
export class OrdersTransactionsController {
  constructor(
    private readonly ordersTransactionsService: OrdersTransactionsService,
    private readonly cartHelper: CartHelper,
    private readonly productHelper: ProductHelper,
    private readonly transactionHelper: TransactionHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkout/payment')
  async checkoutPayement(@User() user: AuthUserInfo) {
    const carts = await this.cartHelper.removeUserCartGetValue(user);
    let transactionLink = null;
    if (carts) {
      const orderData: OrderTransactionInterface = {
        amount: getAmount(carts),
        cart: getCartProduct(carts),
        user: user.userId,
        code: createRandomCode(),
      };
      const order = await this.ordersTransactionsService.createOrder(orderData);
      await this.productHelper.decreaseProductQuantity(carts);
      const { id, link } = await this.transactionHelper.createTransaction(user, order);
      const transaction: TransactionInterface = {
        id,
        link,
      };
      await this.ordersTransactionsService.updateOrderTransaction(order.id, { transaction });
      transactionLink = link;
    }
    
    return {
      transactionLink
    };
  };

  @Post('payment/verify')
  async verifyPayment(@Body() createOrderPaymentDto: CreateOrderPaymentDto, @Res() res: Response) {
    const isUnique = await this.transactionHelper.uniqueTransactionIdAndTrackId(
      createOrderPaymentDto.id,
      createOrderPaymentDto.track_id,
      createOrderPaymentDto.order_id
    );
    
    if (!isUnique) {
      return 
    }

    const transaction: TransactionInterface = {
      status: createOrderPaymentDto.status,
      trackId: createOrderPaymentDto.track_id,
      cartNo: createOrderPaymentDto.card_no,
    };

    const orderTransaction = await this.ordersTransactionsService.updateOrderTransaction(createOrderPaymentDto.order_id, { transaction });
    console.log(orderTransaction);
    if (orderTransaction.amount !== createOrderPaymentDto.amount) {
      return
    }
    
    if( createOrderPaymentDto.status == 10 ) {
      const verifyPayementResponse = await this.transactionHelper.verifyPaymentHelper(
        createOrderPaymentDto.order_id, 
        createOrderPaymentDto.id
      );
      console.log(verifyPayementResponse);
      const verifyPaymentData = verifyPayementResponse.data;
      const statusCode = verifyPayementResponse.status;
      if(verifyPaymentData.status === 100 && statusCode == 200) {
        res.redirect('http://localhost:5173');
      }
      
    } else {

    }

  
  };
}
