import { Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/admins.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { standardPhonNumber } from 'src/common/helper';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService
  ) {}

  async validateUser(phoneNumber: string, pass: string): Promise<any> {
    const admin = (await this.adminsService.findByPhone(standardPhonNumber(phoneNumber)))?.toObject();
    if (!admin || !admin.password) {
      return null;
    }
    
    const isValidPassword = await bcrypt.compare(pass, admin.password);
    if (admin && isValidPassword) {
      const { password, ...result } = admin;
      return {...result};
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      phoneNumber: user.phoneNumber, 
      sub: user._id.toString(),
      roles: ['admin']
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}