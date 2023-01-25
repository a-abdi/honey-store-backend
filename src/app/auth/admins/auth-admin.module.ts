import { Module } from '@nestjs/common';
import { AuthService } from './auth-admin.service';
import { LocalStrategy } from './admin-local.strategy';
import { AdminsModule } from '../../admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth-admin.controller';
import { JwtStrategy } from './jwt.strategy';
import 'dotenv/config';

@Module({
  controllers: [AuthController],
  imports: [
    AdminsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ADMIN_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}