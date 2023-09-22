import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';


@Injectable()
export class RedisService {
    private readonly redisClient: Redis;

    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {
        this.redisClient = redis;
    }

    async set(key: string, value: string, expirationSeconds: number) {
        await this.redisClient.set(key, value, 'EX', expirationSeconds);
    }

    async get(key: string): Promise<string | null> {
        return await this.redisClient.get(key);
    }

    async delete(key: string): Promise<number> {
        return await this.redisClient.del(key);
    }

    async getTtl(key: string): Promise<number> {
        return await this.redisClient.ttl(key);
    }
}
