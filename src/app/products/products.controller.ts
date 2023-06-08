import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipe, UseGuards, UploadedFiles, Req, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileStorage } from 'src/common/helper';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../../common/declare/enum';
import { MongoIdParams } from '../../common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BindProductCode } from 'src/common/interceptor/bind-product-code';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { ImageHelper } from './helper/image.helper';
import { UrlHelper } from 'src/common/helper/url.helper';
import { Request } from 'express';
import { ProductQueryDto } from './dto/product-query.dto';

@ResponseMessage(Message.SUCCESS())
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imageHelper: ImageHelper,
    private readonly urlHelper: UrlHelper,
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
    @User() user: AuthUserInfo,
    @Req() request: Request
  ) {
    files?.attach && this.imageHelper.injectAttachSrcToPropery(files.attach, createProductDto);
    let productImagesSrc: string[] = [];
    if (files?.product) {
      productImagesSrc = this.imageHelper.injectFileSrc(files.product);
    }
    let additionalsImageSrc: string[] = [];
    if (files?.additionals) {
      additionalsImageSrc = this.imageHelper.injectFileSrc(files.additionals);
    }
    const product = await this.productsService.create(createProductDto, productImagesSrc, additionalsImageSrc, user);
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }

  @Get()
  async findAll(@Req() request: Request, @Query() query: ProductQueryDto) {
    const result = await this.productsService.findAll(query);
    result.map(product => {
      this.urlHelper.bindHostUrlToProduct(product, request);
    });
    return result;
  }

  @Get(':_id')
  async findOne(@Param() params: MongoIdParams, @Req() request: Request) {
    const product = await this.productsService.findOne(params._id);
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Patch(':_id')
  async update(
    @UploadedFiles() files: { 
      product?: Express.Multer.File[], 
      attach?: Express.Multer.File[],
      additionals: Express.Multer.File[],
    },
    @Param() params: MongoIdParams,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: AuthUserInfo,
    @Req() request: Request
  ) {
    files?.attach && this.imageHelper.injectAttachSrcToPropery(files.attach, updateProductDto);
    const productUpdateData: any = {...updateProductDto};
    if (files?.product) {
      productUpdateData.productImagesSrc = this.imageHelper.injectFileSrc(files.product);
    }
    if (files?.additionals) {
      productUpdateData.additionalsImageSrc = this.imageHelper.injectFileSrc(files.additionals);
    }
    productUpdateData.admin = user.userId;
    const product = await this.productsService.update(params._id, productUpdateData);
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  async remove(@Param() params: MongoIdParams, @Req() request: Request) {
    const product = await this.productsService.remove(params._id);
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }
}
