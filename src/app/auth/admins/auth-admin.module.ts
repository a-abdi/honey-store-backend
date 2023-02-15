import { Module } from '@nestjs/common';
import { AdminAuthService } from './auth-admin.service';
import { AdminLocalStrategy } from './admin-local.strategy';
import { AdminsModule } from '../../admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './auth-admin.controller';
import { AdminJwtStrategy } from './admin-jwt.strategy';
import 'dotenv/config';

@Module({
  controllers: [AdminAuthController],
  imports: [
    AdminsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ADMIN_JWT_SECRET,
      signOptions: { expiresIn: process.env.ADMIN_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AdminAuthService, AdminLocalStrategy, AdminJwtStrategy],
  exports: [AdminAuthService],
})
export class AuthModule {}