import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { standardPhonNumber } from 'src/common/helper';
import { AuthUserInterface } from './interface/user.interface';

@Injectable()
export class UserAuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const user = (await this.usersService.findByPhone(standardPhonNumber(phoneNumber)))?.toObject();
    
    if (!user || !user.password) {
      return null;
    }
    
    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return {...result};
    }
    return null;
  }

  async login(user: AuthUserInterface) {
    const payload = { 
      phoneNumber: user.phoneNumber, 
      sub: user._id.toString(),
      roles: ['user']
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}