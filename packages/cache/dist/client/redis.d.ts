import Redis from "ioredis";
export interface CreateRedisClientOptions {
    redisUrl?: string;
    maxRetriesPerRequest?: number;
    lazyConnect?: boolean;
}
export declare function createRedisClient(options?: CreateRedisClientOptions): Redis;
export type RedisClientType = ReturnType<typeof createRedisClient>;
export declare function resetRedisClient(): void;
//# sourceMappingURL=redis.d.ts.map