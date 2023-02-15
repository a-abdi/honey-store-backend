import { Module } from '@nestjs/common';
import { AdminAuthService } from './auth-admin.service';
import { AdminLocalStrategy } from './admin-local.strategy';
import { AdminsModule } from '../../admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthController } from './auth-admin.controller';
import 'dotenv/config';
import { JwtStrategy } from '../jwt.strategy';
import { UsersModule } from 'src/app/users/users.module';

@Module({
  controllers: [AdminAuthController],
  imports: [
    AdminsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ADMIN_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AdminAuthService, AdminLocalStrategy, JwtStrategy],
  exports: [AdminAuthService],
})
export class AuthModule {}