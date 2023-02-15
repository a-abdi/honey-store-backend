import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/app/auth/roles.guard';
import { Role } from 'src/common/declare/enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MongoIdParams } from '../../common/class/mongo-id-params';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':_id')
  async findOne(@Param() params: MongoIdParams) {
    return await this.categoriesService.findByID(params._id);
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id')
  async update(@Param() params: MongoIdParams, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(params._id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  async remove(@Param() params: MongoIdParams) {
    return await this.categoriesService.remove(params._id);
  }
}
