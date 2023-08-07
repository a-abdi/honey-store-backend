import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from './user-local-auth.guard';
import { UserAuthService } from './auth-user.service';
import { RedisService } from 'src/app/redis/redis.service';
import { SendSmsDto } from './dto/send-sms.dto';
import { SmsService } from 'src/app/sms/sms.service';
import { ConfigService } from '@nestjs/config';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { Message } from 'src/common/message';
import { Name } from 'src/common/message/name';
import { UsersService } from 'src/app/users/users.service';
import { AuthUserInterface } from './interface/user.interface';

@Controller('auth')
export class UserAuthController {
  constructor(
    private readonly authService: UserAuthService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req.user as AuthUserInterface;
    return this.authService.login(user);
  }

  @Post('login/sendsms')
  async sendSms(@Body() { phoneNumber }: SendSmsDto) {
    const minCode = 100000;
    const maxCode = 1000000;
    const code = Math.floor(Math.random() * (maxCode - minCode) + minCode).toString();
    const templateId = this.configService.get('verifyCodeTemp');
    this.smsService.sendVerifyCode(phoneNumber, [{ name: "Code", value: code }], templateId);
    await this.redisService.set(`${phoneNumber}_verifyCode`, code, this.configService.get('verifyCodeExpire'));
    return {
      phoneNumber,
      smsTtl: this.configService.get('verifyCodeExpire'),
    }
  }

  @Post('login/verifycode')
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    const { phoneNumber, code } = verifyCodeDto;
    const verifyCode = await this.redisService.get(`${phoneNumber}_verifyCode`);
    if (code !== verifyCode) {
      throw new UnauthorizedException(Message.INCORRECT(Name.VERIFY_CODE));
    }
    this.redisService.delete(`${phoneNumber}_verifyCode`);
    let user = await this.usersService.findByPhone(phoneNumber);
    if (!user) {
      user = await this.usersService.create({ phoneNumber });
    }
    return this.authService.login({phoneNumber: user.phoneNumber, _id: user._id });
  }
}