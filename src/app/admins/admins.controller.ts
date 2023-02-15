import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '../../common/declare/enum'
import { RolesGuard } from 'src/app/auth/roles.guard';
import { MongoIdParams } from 'src/common/helper';
import { PhoneNumberParams } from '../../common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin: Admin = (await this.adminsService.create(createAdminDto)).toObject();
    delete newAdmin.password;
    return newAdmin;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.adminsService.findAll();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':phoneNumber')
  async findOne(@Param() params: PhoneNumberParams) {
    return await this.adminsService.findByPhone(params.phoneNumber);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':_id')
  update(@Param() params: MongoIdParams, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(params._id, updateAdminDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.adminsService.remove(params._id);
  }
}