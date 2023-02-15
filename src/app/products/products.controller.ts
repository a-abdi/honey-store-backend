import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/app/common/helper';
import { FileMaxSizeValidator } from '../service/file-max-size-validation';
import { FileTypeValidator } from '../service/file-type-validation';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../common/declare/enum';
import { Request } from 'express';
import { MongoIdParams } from '../common/class/mongo-id-params';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file',{ storage: fileStorage('upload/product') }))
  create(
    @UploadedFile('file', new ParseFilePipe({
      validators: [
        new FileMaxSizeValidator({maxSize: 500000}),
        new FileTypeValidator({validType: ['jpg', 'jpeg', 'png']})
      ],
    }))
    file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Req() request: Request,
  ) {
    return this.productsService.create(createProductDto, file, request.user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':_id')
  findOne(@Param() params: MongoIdParams) {
    return this.productsService.findOne(params._id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param() params: MongoIdParams, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(params._id, updateProductDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.productsService.remove(params._id);
  }
}
