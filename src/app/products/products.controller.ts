import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/app/common/helper';
import { FileMaxSizeValidator } from '../common/service/file-max-size-validation';
import { FileTypeValidator } from '../common/service/file-type-validation';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
    @Body() createProductDto: CreateProductDto
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
