import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MongoIdParams } from 'src/common/helper';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':_id')
  findOne(@Param() params: MongoIdParams) {
    return this.cartsService.findOne(params._id);
  }

  @Patch(':_id')
  update(@Param() params: MongoIdParams, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(params._id, updateCartDto);
  }

  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.cartsService.remove(params._id);
  }
}
