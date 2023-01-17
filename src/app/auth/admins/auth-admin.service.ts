import { Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/admins.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const admin = (await this.adminsService.findOne(username)).toObject();
    const isValidPassword = await bcrypt.compare(pass, admin.password)
    if (admin && isValidPassword) {
      const { password, ...result } = admin;
      return {...result};
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user._id.toString(),
      roles: ['admin']
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}