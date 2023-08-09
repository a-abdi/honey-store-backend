import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { grabObjectInArrayOfObject } from 'src/common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/entities/product.entity';
import { Request } from 'express';
import { UrlHelper } from 'src/common/helper/url.helper';
import { MongoIdParams } from 'src/common/dto/mongo-param.dto';

@ResponseMessage(Message.SUCCESS())
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
    private readonly urlHelper: UrlHelper,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async cart(@User() user: AuthUserInfo, @Req() request: Request) {
    const userCart = await this.cartsService.findUserCart(user.userId);
    if (userCart) {
      userCart?.products?.map(cartProduct => { 
        const product = cartProduct.product as Product;
        this.urlHelper.bindHostUrlToProduct(product, request);
      })
    };
    return userCart;
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async addToCart(@Body() createCartDto: CreateCartDto, @User() user: AuthUserInfo) {
    const { products } = createCartDto;
    const productsId = products.map(product => product._id);
    let productList = await this.productService.productList(productsId);
    productList = productList.filter(product => !product.deletedAt);
    for (const newCartProduct of products) {
      const product = grabObjectInArrayOfObject(productList, "_id", newCartProduct._id);
      const maxQuantity = product?.quantity;
      const oldCartProducts = await this.cartsService.removeFromCart(newCartProduct._id, user);
      const oldProduct = grabObjectInArrayOfObject(oldCartProducts?.products, "product", newCartProduct._id);
      let newQuantity = newCartProduct?.quantity;
      if (oldProduct?.quantity) {
        newQuantity = oldProduct?.quantity + newCartProduct?.quantity;
      }
      newCartProduct.quantity = (newQuantity > maxQuantity ? maxQuantity : newQuantity);
      if (maxQuantity > 0) {
        this.cartsService.addToCart({quantity: newCartProduct.quantity, product: newCartProduct._id}, user);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('products/:_id')
  async update(@Param() { _id }: MongoIdParams, @Body() updateCartDto: UpdateCartDto, @User() user: AuthUserInfo) {
    const product = await this.productService.findOne({ _id });
    if(product?.quantity < updateCartDto?.product?.quantity) {
      updateCartDto.product.quantity = product.quantity;
    }
    return this.cartsService.update(_id, updateCartDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:_id')
  async remove(@Param() params: MongoIdParams, @User() user: AuthUserInfo,) {
    const cartProduct = await this.cartsService.removeFromCart(params._id, user, { new: true });
    if (!cartProduct?.products.length) {
      this.cartsService.remove(user.userId);
    }
  }
}