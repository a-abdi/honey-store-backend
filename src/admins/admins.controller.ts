import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    const salt = 10;
    createAdminDto.password = await bcrypt.hash(createAdminDto.password, salt);
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.adminsService.findOne(username);
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
