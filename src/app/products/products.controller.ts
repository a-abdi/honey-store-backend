import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/common/helper';
import { FileMaxSizeValidator } from '../../service/file-max-size-validation';
import { FileTypeValidator } from '../../service/file-type-validation';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../../common/declare/enum';
import { Request } from 'express';
import { MongoIdParams } from '../../common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AddHostUrl } from 'src/common/interceptor/add-host-url';
import { BindProductCode } from 'src/common/interceptor/bindProductCode';

@ResponseMessage(Message.SUCCESS())
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(BindProductCode)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage('upload/product') }))
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
  @UseInterceptors(new AddHostUrl('imageSrc'))
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':_id')
  @UseInterceptors(new AddHostUrl('imageSrc'))
  findOne(@Param() params: MongoIdParams) {
    return this.productsService.findOne(params._id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id')
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
