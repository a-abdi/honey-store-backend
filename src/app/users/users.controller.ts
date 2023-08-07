import { Controller, Get, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/declare/enum';
import { RolesGuard } from '../auth/roles.guard';
import { MongoIdParams } from '../../common/helper';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Message } from 'src/common/message';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthUserInfo } from 'src/interface/auth-user-info';
import { Password } from './service/password';
import { Name } from 'src/common/message/name';
import { UpdatePasswordDto } from './dto/update-password';
import * as bcrypt from 'bcrypt';

@ResponseMessage(Message.SUCCESS())
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly password: Password,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  findOne(@User() user: AuthUserInfo) {
    return this.usersService.findOne(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async passwordUpdate(@Body() updatePasswordDto: UpdatePasswordDto, @User() user: AuthUserInfo) {
    if (!await this.password.isValid(user.phoneNumber, updatePasswordDto.password)) {
      throw new UnauthorizedException({Message: Message.INCORRECT(Name.PASSWORD)});
    };
    const password = await bcrypt.hash(updatePasswordDto.newPassword, 10)
    return this.usersService.updateOne(user.userId, { password });
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @User() user: AuthUserInfo) {
    return this.usersService.update(user.userId, updateUserDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':_id')
  remove(@Param() params: MongoIdParams) {
    return this.usersService.remove(params._id);
  }
}
