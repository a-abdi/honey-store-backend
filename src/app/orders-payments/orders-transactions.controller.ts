import { BadRequestException, Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { OrdersTransactionsService } from './orders-transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { createRandomCode } from 'src/common/helper';
import { OrderTransactionInterface } from './interface/interface';
import { ProductHelper } from './helper/product.helper';
import { CartHelper } from './helper/cart.helper';
import { TransactionHelper } from './helper/transaction.helper';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { Response } from 'express';
import { OrderStatus } from 'src/common/declare/enum';
import { ConfigService } from "@nestjs/config";
import { UserHelper } from './helper/user.helperts';
import { Name } from 'src/common/message/name';
import { CommonHelper } from './helper/coomon.helper';

@ResponseMessage(Message.SUCCESS())
@Controller()
export class OrdersTransactionsController {
  constructor(
    private readonly ordersService: OrdersTransactionsService,
    private readonly cartHelper: CartHelper,
    private readonly productHelper: ProductHelper,
    private readonly transactionHelper: TransactionHelper,
    private readonly configService: ConfigService,
    private readonly userHelper: UserHelper,
    private readonly commonHelper: CommonHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('checkout/payment')
  async checkoutPayement(@User() user: AuthUserInfo) {
    if (await this.userHelper.addressIstEmpty(user.userId)) {
      throw new BadRequestException(Message.NOT_BE_EMPTY(Name.ADDRESS));
    }
    const { transactionData, userCart } = await this.transactionHelper.getData(user);
    if (!userCart) {
      throw new BadRequestException(Message.NOT_BE_EMPTY(Name.CART));
    }
    if (transactionData?.amount < 1000) {
      throw new BadRequestException(Message.AMOUNTIS_LESS_1000());
    }
    await this.productHelper.decreaseProductQuantity(userCart);
    const order = await this.ordersService.createOrder(transactionData);
    const { id, link } = await this.transactionHelper.createTransaction(user, order);
    const transaction = { id, link };
    await this.ordersService.updateOrder(order.id, { transaction } );
    return { transactionLink: link }
  };

  @Post('payment/verify')
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto, @Res() res: Response) {
    try {
      const result = await this.transactionHelper.uniqueTransaction(verifyPaymentDto.id, verifyPaymentDto.track_id, verifyPaymentDto.order_id);
      const transaction = {
        "transaction.status": verifyPaymentDto?.status,
        "transaction.trackId": verifyPaymentDto?.track_id,
        "transaction.cardNo": verifyPaymentDto?.card_no,
        "transaction.hashedCardNo": verifyPaymentDto?.hashed_card_no,
        "transaction.transactionDate": verifyPaymentDto?.date,
        "transaction.transactionAmount": verifyPaymentDto?.amount,
        "transaction.error": result.error,
      };
      const orderTransaction = await this.ordersService.updateOrder(verifyPaymentDto.order_id, transaction);
      if (!result.isUnique || orderTransaction.amount != verifyPaymentDto.amount) {
        return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
      }
      if( verifyPaymentDto.status == 10 ) {
        const verifyPayementResponse = await this.transactionHelper.verifyPaymentHelper(verifyPaymentDto.order_id, verifyPaymentDto.id);
        const verifyPaymentData = verifyPayementResponse.data;
        const statusCode = verifyPayementResponse.status;
        const transactionData = { 
          status: OrderStatus.WatingPay,
          "transaction.status": verifyPaymentData?.status,
          "transaction.paymentTrackId": verifyPaymentData.payment?.track_id,
          "transaction.paymentAmount": verifyPaymentData?.payment?.amount,
          "transaction.paymentDate": verifyPaymentData?.payment?.date,
          "transaction.verifyDate": verifyPaymentData?.verify?.date,
        };
        if(verifyPaymentData.status === 100 && statusCode == 200) {
          transactionData.status = OrderStatus.Payment;
          await this.ordersService.updateOrder(verifyPaymentDto.order_id, transactionData);
          return res.redirect(this.configService.get("ORDER_FRONT_URL"));
        } else {
          await this.ordersService.updateOrder(verifyPaymentDto.order_id, transactionData);
          return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
        }
      } else {
        return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
      }
    } catch (error) {
      return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('/order')
  async userOrder(@User() user: AuthUserInfo) {
    return await this.ordersService.findUserOrders(user);
  }
}
