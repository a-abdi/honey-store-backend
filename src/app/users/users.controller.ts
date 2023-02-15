import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/declare/enum';
import { RolesGuard } from '../auth/roles.guard';
import { MongoIdParams } from '../common/class/mongo-id-params';
import { SelfUser } from '../auth/self-user.guard';
import { AdminJwtAuthGuard } from '../auth/admins/admin-jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard)
  @Get(':_id')
  findOne(@Param() params: MongoIdParams) {
    return this.usersService.findOne(params._id);
  }

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Patch(':_id')
  update(@Param() params: MongoIdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params._id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AdminJwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.usersService.remove(params._id);
  }
}
