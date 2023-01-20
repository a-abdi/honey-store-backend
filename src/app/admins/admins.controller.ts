import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/app/common/decorators/roles.decorator';
import { Role } from '../common/declare/enum'
import { RolesGuard } from 'src/app/auth/roles.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    const salt = 10;
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, salt);
    return this.adminsService.create(createAdminDto);
  }

  // @Roles(Role.User)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const admin = await this.adminsService.findAll();
    return admin;
    // return this.adminsService.findAll();
  }

  @Get(':phoneNumber')
  async findOne(@Param('phoneNumber') phoneNumber: string) {
    return await this.adminsService.findOne(phoneNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
