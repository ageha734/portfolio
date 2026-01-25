import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { createRedisClient, resetRedisClient } from "./redis";
describe("createRedisClient", () => {
    let client = null;
    beforeEach(() => {
        client = null;
    });
    afterEach(async () => {
        resetRedisClient();
        client = null;
    });
    test("should throw error when REDIS_URL is not provided", () => {
        const originalEnv = process.env.REDIS_URL;
        delete process.env.REDIS_URL;
        expect(() => {
            createRedisClient();
        }).toThrow("REDIS_URL environment variable is required");
        if (originalEnv) {
            process.env.REDIS_URL = originalEnv;
        }
    });
    test("should create Redis client with redis URL", () => {
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        client = createRedisClient({ redisUrl });
        expect(client).toBeDefined();
        expect(typeof client.get).toBe("function");
        expect(typeof client.set).toBe("function");
    });
    test("should create Redis client without options (using env var)", () => {
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        process.env.REDIS_URL = redisUrl;
        client = createRedisClient();
        expect(client).toBeDefined();
        expect(typeof client.get).toBe("function");
        expect(typeof client.set).toBe("function");
    });
    test("should return same instance on multiple calls (singleton)", () => {
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        const client1 = createRedisClient({ redisUrl });
        const client2 = createRedisClient({ redisUrl });
        expect(client1).toBe(client2);
    });
    test("should create Redis client with custom options", () => {
        const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
        client = createRedisClient({
            redisUrl,
            maxRetriesPerRequest: 5,
            lazyConnect: true,
        });
        expect(client).toBeDefined();
        expect(client.options.maxRetriesPerRequest).toBe(5);
        expect(client.options.lazyConnect).toBe(true);
    });
});
