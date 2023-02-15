import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from 'src/app/admins/admins.service';
import 'dotenv/config';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(private adminsService: AdminsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ADMIN_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const _id: string = payload.sub;
    const admin = (await this.adminsService.findByID(_id))?.toObject();

    if (!admin) {
      throw new UnauthorizedException();
    }

    if (payload?.phoneNumber !== admin.phoneNumber) {
      throw new UnauthorizedException();
    }

    return { 
      adminId: _id, 
      phoneNumber: payload.phoneNumber,
      roles: payload.roles,
   };
  }
}