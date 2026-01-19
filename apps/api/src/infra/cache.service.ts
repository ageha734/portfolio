import { createRedisClient } from "@portfolio/cache";
import type { Redis } from "ioredis";

export class CacheService {
	private redis: Redis | null = null;
	private readonly ttl: number;

	constructor(
		private readonly redisUrl?: string,
		ttlSeconds: number = 3600,
	) {
		this.ttl = ttlSeconds;
	}

	private getRedis(): Redis | null {
		if (this.redis) {
			return this.redis;
		}

		try {
			this.redis = createRedisClient({
				redisUrl: this.redisUrl,
				lazyConnect: false,
			});
			return this.redis;
		} catch (error) {
			console.warn("Redis接続に失敗しました。DBから直接読み取ります:", error);
			return null;
		}
	}

	private reviver(key: string, value: unknown): unknown {
		if (
			typeof value === "string" &&
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value)
		) {
			return new Date(value);
		}
		return value;
	}

	async get<T>(key: string): Promise<T | null> {
		const redis = this.getRedis();
		if (!redis) {
			return null;
		}

		try {
			const value = await redis.get(key);
			if (!value) {
				return null;
			}
			return JSON.parse(value, this.reviver.bind(this)) as T;
		} catch (error) {
			console.warn(`Redis取得エラー (key: ${key}):`, error);
			return null;
		}
	}

	async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
		const redis = this.getRedis();
		if (!redis) {
			return;
		}

		try {
			const ttl = ttlSeconds ?? this.ttl;
			await redis.setex(key, ttl, JSON.stringify(value));
		} catch (error) {
			console.warn(`Redis書き込みエラー (key: ${key}):`, error);
		}
	}

	async delete(key: string): Promise<void> {
		const redis = this.getRedis();
		if (!redis) {
			return;
		}

		try {
			await redis.del(key);
		} catch (error) {
			console.warn(`Redis削除エラー (key: ${key}):`, error);
		}
	}

	async deletePattern(pattern: string): Promise<void> {
		const redis = this.getRedis();
		if (!redis) {
			return;
		}

		try {
			const keys = await redis.keys(pattern);
			if (keys.length > 0) {
				await redis.del(...keys);
			}
		} catch (error) {
			console.warn(`Redisパターン削除エラー (pattern: ${pattern}):`, error);
		}
	}

	async close(): Promise<void> {
		if (this.redis) {
			try {
				await this.redis.quit();
			} catch (error) {
				console.warn("Redis切断エラー:", error);
			}
			this.redis = null;
		}
	}
}
