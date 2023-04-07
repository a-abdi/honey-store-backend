import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/declare/enum';
import { RolesGuard } from '../auth/roles.guard';
import { MongoIdParams } from '../../common/helper';
import { SelfUser } from '../auth/self-user.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@ResponseMessage(Message.SUCCESS())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, SelfUser)
  @Get(':_id')
  findOne(@Param() params: MongoIdParams) {
    return this.usersService.findOne(params._id);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SelfUser)
  @Patch(':_id')
  update(@Param() params: MongoIdParams, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params._id, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.usersService.remove(params._id);
  }
}
