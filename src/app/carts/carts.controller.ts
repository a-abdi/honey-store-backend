import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MongoIdParams, breakArrayOfObjectToOneArray, grabObjectInArrayOfObject } from 'src/common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RolesGuard } from '../auth/roles.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ProductsService } from '../products/products.service';

@ResponseMessage(Message.SUCCESS())
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  cart(@User() user: AuthUserInfo) {
    return this.cartsService.findUserCart(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async addToCart(@Body() createCartDto: CreateCartDto, @User() user: AuthUserInfo) {
    const { products } = createCartDto;
    const productsId = breakArrayOfObjectToOneArray(products, "_id");
    const productList = await this.productService.productList(productsId);
    for (const newCartProduct of products) {
      const product = grabObjectInArrayOfObject(productList, "_id", newCartProduct._id);
      const maxQuantity = product?.quantity;
      const oldCartProducts = await this.cartsService.removeFromCart(newCartProduct._id, user);
      const oldProduct = grabObjectInArrayOfObject(oldCartProducts?.products, "_id", newCartProduct._id);
      let newQuantity = newCartProduct?.quantity;
      if (oldProduct?.quantity) {
        newQuantity = oldProduct?.quantity + newCartProduct?.quantity;
      }
      newCartProduct.quantity = (newQuantity > maxQuantity ? maxQuantity : newQuantity);
      if (maxQuantity > 0) {
        this.cartsService.addToCart(newCartProduct, user);
      }
    }
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('products')
  findAll() {
    return this.cartsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('products/:_id')
  update(@Param() params: MongoIdParams, @Body() updateCartDto: UpdateCartDto, @User() user: AuthUserInfo) {
    return this.cartsService.update(params._id, updateCartDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:_id')
  async remove(@Param() params: MongoIdParams, @User() user: AuthUserInfo,) {
    const cartProduct = await this.cartsService.removeFromCart(params._id, user, { new: true });
    if (!cartProduct?.products.length) {
      this.cartsService.remove(user);
    }
  }
}