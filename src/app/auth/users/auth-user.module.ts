import { Module } from '@nestjs/common';
import { UserAuthService } from './auth-user.service';
import { UserLocalStrategy } from './user-local.strategy';
import { UsersModule } from '../../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './auth-user.controller';
import { JwtStrategy } from '../jwt.strategy';
import 'dotenv/config';
import { AdminsModule } from 'src/app/admins/admins.module';
import { RedisModule } from 'src/app/redis/redis.module';
import redisConfig from 'src/config/redis.config';
import { SmsModule } from 'src/app/sms/sms.module';

@Module({
  controllers: [UserAuthController],
  imports: [
    UsersModule,
    AdminsModule,
    PassportModule,
    SmsModule,
    RedisModule.forRoot({url: redisConfig().url}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.USER_TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [UserAuthService, UserLocalStrategy, JwtStrategy],
  exports: [UserAuthService],
})
export class AuthModule {}