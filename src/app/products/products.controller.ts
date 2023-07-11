import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseFilePipe, UseGuards, UploadedFiles, Req, Query, ForbiddenException, Inject } from '@nestjs/common';
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
import { AuthUserInfo, ResponseMetaDate } from 'src/interface/auth-user-info';
import { ImageHelper } from './helper/image.helper';
import { UrlHelper } from 'src/common/helper/url.helper';
import { Request } from 'express';
import { ProductQueryDto } from './dto/product-query.dto';
import { Name } from 'src/common/message/name';
import { CartsService } from '../carts/carts.service';
import { OrdersTransactionsService } from '../orders/orders-transactions.service';
// import { SortHelper } from 'src/app/products/helper/sort.helper';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { ProductMetaDataHelper } from './helper/product-metadata.helper';
import { QueryHelper } from './helper/query.helper';
import { SORT_QUERY, SortQuery } from 'src/common/declare/sort-query';

@ResponseMessage(Message.SUCCESS())
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly imageHelper: ImageHelper,
    private readonly urlHelper: UrlHelper,
    private readonly ordersTransactionsService: OrdersTransactionsService,
    private readonly cartService: CartsService,
    private readonly queryHelper: QueryHelper,
    private readonly productMetaDataHelper: ProductMetaDataHelper,
    @Inject('SORT_QUERY') private readonly sortQuery: SortQuery,
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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(0)
  async findAll(@Req() request: Request, @Query() queryDto: ProductQueryDto) {
    const { previousPage, sort } = queryDto;
    const query = this.queryHelper.build(queryDto);
    const queryOpt = this.queryHelper.option(queryDto);
    const products = await this.productsService.findAll(query);
    previousPage && products.reverse(); 
    const nextPageQuery = this.queryHelper.nextPage(products, queryDto); 
    queryOpt.limit = 1;
    const previousPageQuery = this.queryHelper.previousPage(products, queryDto); 
    const metaData: ResponseMetaDate = {};
    const [ productNext, productPrevious ] = await Promise.all([
      this.productsService.findAll(nextPageQuery, queryOpt),
      this.productsService.findAll(previousPageQuery, queryOpt),
    ]);
    productNext[0] && (metaData.nextPage = productNext[0]._id + '_' + productNext[0][this.sortQuery[sort].key]);
    productPrevious[0] && (metaData.nextPage = productNext[0]._id + '_' + productPrevious[0][this.sortQuery[sort].key]);
    products.map(product => {
      this.urlHelper.bindHostUrlToProduct(product, request);
    });
    return {
      data: products,
      metaData
    };
  }

  @Get(':_id')
  async findOne(@Param() { _id }: MongoIdParams, @Req() request: Request) {
    const product = (await this.productsService.findOneWithProperty(_id))[0];
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
  async remove(@Param() { _id }: MongoIdParams, @Req() request: Request) {
    const product = await this.ordersTransactionsService.findOne({"cart.product": _id});
    if (product) {
      throw new ForbiddenException(Message.PRODUCT_EXIST_IN(Name.ORDER));
    }
    await this.cartService.removeFromAllUsersCart(_id);
    const productDeleted = await this.productsService.remove(_id);
    this.urlHelper.bindHostUrlToProduct(productDeleted, request);
    return productDeleted;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id/safe-delete')
  async safeRemove(@Param() { _id }: MongoIdParams, @Req() request: Request) {
    await this.cartService.removeFromAllUsersCart(_id);
    const product = await this.productsService.update(_id, { deletedAt: true });
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id/restore')
  async restore(@Param() { _id}: MongoIdParams, @Req() request: Request) {
    const product = await this.productsService.update(_id, { deletedAt: false });
    this.urlHelper.bindHostUrlToProduct(product, request);
    return product;
  }
}
