import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { MongoIdParams } from 'src/common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { RolesGuard } from '../auth/roles.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // @Roles(Role.User)
  @UseGuards(JwtAuthGuard)
  @Post('products')
  addToCart(@Body() createCartDto: CreateCartDto, @Req() request: any) {
    return this.cartsService.addToCart(createCartDto, request);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('products')
  findAll() {
    return this.cartsService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':_id')
  // findOne(
  //   @Param() params: MongoIdParams,
  //   @Req() request: any
  //   ) {
  //   const {user} = request;
  //   return this.cartsService.findByIdAndUserId(params._id, user?.userId);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch('products/:_id')
  update(@Param() params: MongoIdParams, @Body() updateCartDto: UpdateCartDto, @Req() request: any) {
    return this.cartsService.update(params._id, updateCartDto, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('products/:_id')
  remove(@Param() params: MongoIdParams, @Req() request: any) {
    return this.cartsService.remove(params._id, request);
  }
}