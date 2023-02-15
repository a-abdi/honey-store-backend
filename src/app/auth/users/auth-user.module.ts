import { Module } from '@nestjs/common';
import { UserAuthService } from './auth-user.service';
import { UserLocalStrategy } from './user-local.strategy';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './auth-user.controller';
import { UserJwtStrategy } from './user-jwt.strategy';
import 'dotenv/config';

@Module({
  controllers: [UserAuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.USER_JWT_SECRET,
      signOptions: { expiresIn: process.env.USER_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [UserAuthService, UserLocalStrategy, UserJwtStrategy],
  exports: [UserAuthService],
})
export class AuthModule {}