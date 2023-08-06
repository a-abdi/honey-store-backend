import { DynamicModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisConfig } from './interface/config.interface';
import Redis from 'ioredis';

@Module({})
export class RedisModule {
  static forRoot(redisConfig: RedisConfig): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'REDIS_CLIENT',
          useFactory: () => new Redis(redisConfig.url)
        },
        RedisService
      ],
      exports: [RedisService],
    }
  }
}
