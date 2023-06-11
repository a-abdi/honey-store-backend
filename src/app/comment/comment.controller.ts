import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { MongoIdParams } from 'src/common/helper';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { UsersService } from '../users/users.service';
import { OrdersTransactionsService } from '../orders-payments/orders-transactions.service';
import { OrderStatus, Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';
import { NameHelper } from 'src/common/helper/name.helper';

@ResponseMessage(Message.SUCCESS())
@Controller('product')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UsersService,
    private readonly orderService: OrdersTransactionsService,
    private readonly nameHelper: NameHelper,
  ) {}

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':productId/comment')
  async create(@Param() { productId }: MongoIdParams, @User() user: AuthUserInfo, @Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.userFindOne(productId, user);
    if (!comment) {
      const userData = await this.userService.findOne(user.userId);
      const statusList = [OrderStatus.Payment, OrderStatus.Send, OrderStatus.Delivered];
      const orderData = await this.orderService.findByUserAndProduct(user, productId, statusList);
      const userCommentData = {
        id: user.userId,
        fullName: this.nameHelper.userFullName(userData),
        buyer: orderData ? true : false
      };
      this.commentService.create(productId, createCommentDto, userCommentData);
    }
  }

  @Get(':productId/comment')
  async findAll(@Param() params: MongoIdParams) {
    return await this.commentService.findAll(params.productId);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':productId/user/comment')
  async findOne(@Param() params: MongoIdParams, @User() user: AuthUserInfo) {
    return await this.commentService.userFindOne(params.productId, user);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':productId/comment/:commentId')
  async update(@Param() params: MongoIdParams, @User() user: AuthUserInfo, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentService.userUpdate(user, params.commentId, updateCommentDto);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':productId/comment/:commentId')
  async remove(@Param() params: MongoIdParams, @User() user: AuthUserInfo) {
    return await this.commentService.remove(params.commentId, user);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':productId/comment/:commentId/admin')
  async adminRemove(@Param() params: MongoIdParams) {
    return await this.commentService.adminRemove(params.commentId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':productId/comment/:commentId/admin')
  async adminVerify(@Param() params: MongoIdParams) {
    return await this.commentService.adminVerify(params.commentId);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('comment/not-verify')
  async adminGetNotVerify() {
    return await this.commentService.adminGetNotVerify();
  }
}
