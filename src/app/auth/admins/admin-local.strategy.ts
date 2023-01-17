import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth-admin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      username: 'email',
      password: 'password',
      roles: ['role']
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const admin = await this.authService.validateUser(username, password);
    if (!admin) {
      throw new UnauthorizedException();
    }
    
    return admin;
  }
}