import Redis from "ioredis";
let redisInstance = null;
export function createRedisClient(options = {}) {
    const { redisUrl, maxRetriesPerRequest = 3, lazyConnect = false, } = options;
    if (redisInstance) {
        return redisInstance;
    }
    const url = redisUrl || process.env.REDIS_URL;
    if (!url) {
        throw new Error("REDIS_URL environment variable is required. Please set REDIS_URL in your .env file or pass it as an option.");
    }
    redisInstance = new Redis(url, {
        maxRetriesPerRequest,
        lazyConnect,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        enableReadyCheck: true,
    });
    redisInstance.on("error", (error) => {
        console.error("Redis Client Error:", error);
    });
    redisInstance.on("connect", () => {
        console.log("Redis Client Connected");
    });
    redisInstance.on("ready", () => {
        console.log("Redis Client Ready");
    });
    return redisInstance;
}
