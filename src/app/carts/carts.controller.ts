import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MongoIdParams, breakArrayOfObjectToOneArray, grabObjectInArrayOfObject } from 'src/common/helper';
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

@ResponseMessage(Message.SUCCESS())
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productService: ProductsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async cart(@User() user: AuthUserInfo, @Req() request: Request) {
    const userCart = await this.cartsService.findUserCart(user);
    if (userCart) {
      userCart?.products?.map(cartProduct => { 
        const hostAddress = `${request.protocol}://${request.get('host')}`;
        const product = cartProduct.product as Product;
        product.imageSrc = `${hostAddress}/${product?.imageSrc}`;
      })
    };
    return userCart;
  }

  @UseGuards(JwtAuthGuard)
  @Post('products')
  async addToCart(@Body() createCartDto: CreateCartDto, @User() user: AuthUserInfo) {
    const { products } = createCartDto;
    // get product id list
    const productsId = breakArrayOfObjectToOneArray(products, "_id");
    // find product in product id list
    const productList = await this.productService.productList(productsId);
    for (const newCartProduct of products) {
      // get product wich find from product for use max count
      const product = grabObjectInArrayOfObject(productList, "_id", newCartProduct._id);
      const maxQuantity = product?.quantity;
      // delete duplicat product form user cart then sum count insert new product
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
  async update(@Param() params: MongoIdParams, @Body() updateCartDto: UpdateCartDto, @User() user: AuthUserInfo) {
    const product = await this.productService.findOne(params._id);
    if(product?.quantity < updateCartDto?.product?.quantity) {
      updateCartDto.product.quantity = product.quantity;
    }
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