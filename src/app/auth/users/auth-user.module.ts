import { Module } from '@nestjs/common';
import { AuthService } from './auth-user.service';
import { LocalStrategy } from './user-local.strategy';
import { AdminsModule } from '../../admins/admins.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth-user.controller';
import { JwtStrategy } from '../admins/jwt.strategy';
import 'dotenv/config';

@Module({
  controllers: [AuthController],
  imports: [
    AdminsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}