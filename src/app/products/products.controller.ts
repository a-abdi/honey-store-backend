import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, UseGuards, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/common/helper';
import { FileMaxSizeValidator } from '../../service/file-max-size-validation';
import { FileTypeValidator } from '../../service/file-type-validation';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../../common/declare/enum';
import { MongoIdParams } from '../../common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { AddHostUrl } from 'src/common/interceptor/add-host-url';
import { BindProductCode } from 'src/common/interceptor/bind-product-code';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { createUpdateData } from './service/create-update-data';
import { ImageHelper } from './helper/image.helper';

@ResponseMessage(Message.SUCCESS())
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imageHelper: ImageHelper
    ) {}

  @UseInterceptors(BindProductCode)
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'product', maxCount: 1 },
        { name: 'attach', maxCount: 4 },
        { name: 'additionals', maxCount: 4 },
      ], 
      { storage: fileStorage('upload/product') }
    )  
  )
  async create(
    @UploadedFiles(new ParseFilePipe()) files: { 
      product?: Express.Multer.File[], 
      attach?: Express.Multer.File[],
      additionals: Express.Multer.File[],
    },
    @Body() createProductDto: CreateProductDto,
    @User() user: AuthUserInfo
  ) {
    this.imageHelper.injectAttachSrcToPropery(files?.attach, createProductDto);
    const productImagesSrc = this.imageHelper.injectFileSrc(files.product);
    const additionalsImageSrc = this.imageHelper.injectFileSrc(files.additionals);
    return await this.productsService.create(createProductDto, productImagesSrc, additionalsImageSrc, user);
  }

  @Get()
  @UseInterceptors(new AddHostUrl('imageSrc'))
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':_id')
  @UseInterceptors(new AddHostUrl('imageSrc'))
  async findOne(@Param() params: MongoIdParams) {
    return await this.productsService.findOne(params._id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(new AddHostUrl('imageSrc'))
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage('upload/product') }))
  @Patch(':_id')
  update(
    @UploadedFile('file', new ParseFilePipe({
      validators: [
        new FileMaxSizeValidator({maxSize: 500000}),
        new FileTypeValidator({validType: ['jpg', 'jpeg', 'png']})
      ],
      fileIsRequired: false
    })) file: Express.Multer.File,
    @Param() params: MongoIdParams,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: AuthUserInfo,
  ) {
    const updateData = createUpdateData(file, user, updateProductDto);
    return this.productsService.update(params._id, updateData);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.productsService.remove(params._id);
  }
}
