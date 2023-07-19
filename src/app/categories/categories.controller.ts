import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipe, Req } from '@nestjs/common';
import { RolesGuard } from 'src/app/auth/roles.guard';
import { Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MongoIdParams, fileStorage } from 'src/common/helper';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Message } from 'src/common/message';
import { CategoryQueryDto } from './dto/category-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileMaxSizeValidator } from 'src/service/file-max-size-validation';
import { FileTypeValidator } from 'src/service/file-type-validation';
import { Request } from 'express';
import { HostAddress } from './helper/host-address';
import { UpdateCategoryData } from './interface/category-data.interface';

@ResponseMessage(Message.SUCCESS())
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly hostAddress: HostAddress,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage('upload/category') }))
  async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileMaxSizeValidator({ maxSize: 100000 }),
        new FileTypeValidator({ validType: ['jpg', 'png', 'jpeg', 'webp'] }),
      ],
  })) file: Express.Multer.File,
  @Req() request: Request) {
    const category = await this.categoriesService.create({ ... createCategoryDto, imageSrc: file.path });
    this.hostAddress.bindToOne(request, category);
    return category;
  }

  @Get()
  async findAll(@Query() query: CategoryQueryDto, @Req() request: Request) {
    const categories = await this.categoriesService.findAll(query);
    this.hostAddress.bindToMany(request, categories);
    return categories;
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':_id')
  async findOne(@Param() params: MongoIdParams, @Req() request: Request) {
    const category = await this.categoriesService.findByID(params._id);
    this.hostAddress.bindToOne(request, category);
    return category;
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage('upload/category') }))
  async update(
    @Param() params: MongoIdParams, 
    @Body() updateCategoryDto: UpdateCategoryDto, 
    @Req() request: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileMaxSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ validType: ['jpg', 'png', 'jpeg', 'webp'] }),
        ],
        fileIsRequired: false
  })) file: Express.Multer.File) {
    const updateData :UpdateCategoryData = { ...updateCategoryDto };
    file?.path && (updateData.imageSrc =  file.path);
    const category =  await this.categoriesService.update(params._id, updateData);
    this.hostAddress.bindToOne(request, category);
    return category;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  async remove(@Param() params: MongoIdParams) {
    return await this.categoriesService.remove(params._id);
  }
}
