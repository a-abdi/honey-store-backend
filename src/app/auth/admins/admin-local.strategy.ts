import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './auth-admin.service';
import { Message } from 'src/common/message';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'admin-local') {
  constructor(private authService: AdminAuthService) {
    super({
      usernameField: 'phoneNumber',
      passwordField: 'password',
    });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const admin = await this.authService.validateUser(phoneNumber, password);
    if (!admin) {
      throw new UnauthorizedException(Message.INVALID_PHONE_OR_PASSWORD());
    }
    
    return admin;
  }
}