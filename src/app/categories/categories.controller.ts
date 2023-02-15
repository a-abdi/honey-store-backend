import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/app/auth/roles.guard';
import { Role } from 'src/app/common/declare/enum';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { AdminJwtAuthGuard } from '../auth/admins/admin-jwt-auth.guard';
import { MongoIdParams } from '../common/class/mongo-id-params';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }
  
  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Get(':_id')
  async findOne(@Param() params: MongoIdParams) {
    return await this.categoriesService.findByID(params._id);
  }
  
  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Patch(':_id')
  async update(@Param() params: MongoIdParams, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(params._id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Delete(':_id')
  async remove(@Param() params: MongoIdParams) {
    return await this.categoriesService.remove(params._id);
  }
}
