import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import 'dotenv/config';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.USER_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const _id: string = payload.sub;
    const user = (await this.usersService.findOne(_id))?.toObject();

    if (!user) {
      throw new UnauthorizedException();
    }

    if (payload?.phoneNumber !== user.phoneNumber) {
      throw new UnauthorizedException();
    }

    return { 
      userId: _id, 
      phoneNumber: payload.phoneNumber,
      roles: payload.roles,
   };
  }
}