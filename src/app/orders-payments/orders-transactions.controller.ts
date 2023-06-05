import { BadRequestException, Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { OrdersTransactionsService } from './orders-transactions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { ProductHelper } from './helper/product.helper';
import { TransactionHelper } from './helper/transaction.helper';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { Request, Response } from 'express';
import { OrderStatus } from 'src/common/declare/enum';
import { ConfigService } from "@nestjs/config";
import { UserHelper } from './helper/user.helperts';
import { Name } from 'src/common/message/name';
import { CommonHelper } from './helper/coomon.helper';
import { Schema } from 'mongoose';
import { CartsService } from '../carts/carts.service';
import { UrlHelper } from 'src/common/helper/url.helper';

@ResponseMessage(Message.SUCCESS())
@Controller()
export class OrdersTransactionsController {
  constructor(
    private readonly ordersService: OrdersTransactionsService,
    private readonly productHelper: ProductHelper,
    private readonly transactionHelper: TransactionHelper,
    private readonly configService: ConfigService,
    private readonly userHelper: UserHelper,
    private readonly commonHelper: CommonHelper,
    private readonly cartService: CartsService,
    private readonly urlHelper: UrlHelper
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
    const { id, link } = await this.transactionHelper.createTransaction(user, order, transactionData.orderId);
    const transaction = { id, link };
    await this.ordersService.updateOrder(transactionData.orderId, { transaction } );
    return { transactionLink: link }
  };

  @Post('payment/verify')
  async verifyPayment(@Body() verifyPaymentDto: VerifyPaymentDto, @Res() res: Response) {
    try {
      const result = await this.transactionHelper.uniqueTransaction(verifyPaymentDto.id, verifyPaymentDto.track_id, verifyPaymentDto.order_id);
      const transaction = this.transactionHelper.getVerifyPaymentDto(verifyPaymentDto, result.error);
      const orderTransaction = await this.ordersService.updateOrder(verifyPaymentDto.order_id, transaction);
      this.cartService.remove(orderTransaction?.user as Schema.Types.ObjectId);
      if (!result.isUnique || orderTransaction?.amount != verifyPaymentDto?.amount) {
        await this.ordersService.updateOrder(verifyPaymentDto.order_id, { status: OrderStatus.Cancel });
        return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
      }
      if( verifyPaymentDto.status == 10 ) {
        const verifyPayementResponse = await this.transactionHelper.verifyPaymentHelper(verifyPaymentDto.order_id, verifyPaymentDto.id);
        const verifyPaymentData = verifyPayementResponse.data;
        const statusCode = verifyPayementResponse.status;
        const transactionData = this.transactionHelper.getTransactionData(verifyPaymentData);
        if(verifyPaymentData.status === 100 && statusCode == 200) {
          try {
            transactionData.status = OrderStatus.Payment;
            await this.ordersService.updateOrder(verifyPaymentDto.order_id, transactionData);
            return res.redirect(this.configService.get("VERIFY_ORDER_FRONT_URL"));
          } catch (error) {
            this.commonHelper.saveVerifyLog(orderTransaction.user as Schema.Types.ObjectId, {orderTransaction, verifyPaymentData});
            return res.redirect(this.configService.get("FAILD_VERIFY_DB_FRONT_URL"));
          }
        } else {
          transactionData.status = OrderStatus.Cancel;
          await this.ordersService.updateOrder(verifyPaymentDto.order_id, transactionData);
          return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
        }
      } else {
        await this.ordersService.updateOrder(verifyPaymentDto.order_id, { status: OrderStatus.Cancel });
        return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
      }
    } catch (error) {
      return res.redirect(this.configService.get("FAILD_PAYMENT_FRONT_URL"));
    }
  };

  @UseGuards(JwtAuthGuard)
  @Get('/order')
  async userOrder(@User() user: AuthUserInfo, @Req() request: Request) {
    const userOrder = await this.ordersService.findUserOrders(user);
    const hostAddress = this.urlHelper.getHostAddress(request);
    this.urlHelper.bindHostCartOrder(userOrder, hostAddress);
    return userOrder;
  }
}
