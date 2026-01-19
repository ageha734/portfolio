import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";

/**
 * TiDB Cloud Configuration
 *
 * Note: TiDB Cloud doesn't have an official Pulumi provider.
 * We use the REST API via a custom resource or manage via Terraform provider bridge.
 * For now, this module provides configuration and outputs for manual/API setup.
 */

export interface TiDBClusterConfig {
	name: string;
	clusterType: "SERVERLESS" | "DEDICATED";
	cloudProvider: "AWS" | "GCP";
	region: string;
	rootPassword?: pulumi.Output<string>;
	// Serverless specific
	serverless?: {
		spendingLimitMonthly?: number;
	};
	// Dedicated specific
	dedicated?: {
		tidbNodeSize: string;
		tidbNodeCount: number;
		tikvNodeSize: string;
		tikvNodeCount: number;
		tiflashNodeSize?: string;
		tiflashNodeCount?: number;
	};
}

export interface TiDBOutputs {
	clusterConfig: TiDBClusterConfig;
	connectionString: pulumi.Output<string>;
}

/**
 * Generate TiDB Cloud connection string
 * The actual cluster should be created via TiDB Cloud console or API
 */
export function createTiDBConfig(
	config: InfraConfig,
	clusterConfig: TiDBClusterConfig,
): TiDBOutputs {
	// Connection string format for TiDB Serverless
	// mysql://user:password@gateway.region.prod.aws.tidbcloud.com:4000/database?sslaccept=strict
	const connectionString = pulumi.interpolate`mysql://${config.tidb.publicKey}:${config.tidb.privateKey}@gateway.${config.tidb.region}.prod.aws.tidbcloud.com:4000/portfolio?sslaccept=strict`;

	return {
		clusterConfig,
		connectionString,
	};
}

/**
 * Portfolio TiDB Serverless configuration
 */
export function createPortfolioTiDBConfig(config: InfraConfig): TiDBOutputs {
	return createTiDBConfig(config, {
		name: "portfolio-db",
		clusterType: "SERVERLESS",
		cloudProvider: "AWS",
		region: config.tidb.region,
		serverless: {
			spendingLimitMonthly: 0, // Free tier
		},
	});
}

/**
 * Redis Cloud Configuration
 *
 * Note: Redis Cloud doesn't have an official Pulumi provider.
 * We provide configuration for API-based management.
 */

export interface RedisCloudConfig {
	subscriptionName: string;
	databaseName: string;
	cloudProvider: "AWS" | "GCP" | "AZURE";
	region: string;
	memoryLimitInGb?: number;
	throughputMeasurement?: {
		by: "operations-per-second" | "number-of-shards";
		value: number;
	};
	dataEvictionPolicy?:
		| "noeviction"
		| "allkeys-lru"
		| "volatile-lru"
		| "allkeys-random"
		| "volatile-random"
		| "volatile-ttl"
		| "volatile-lfu"
		| "allkeys-lfu";
	replication?: boolean;
	dataPersistence?: "none" | "aof-every-write" | "aof-every-1-second" | "snapshot-every-1-hour" | "snapshot-every-6-hours" | "snapshot-every-12-hours";
}

export interface RedisOutputs {
	config: RedisCloudConfig;
	connectionString: pulumi.Output<string>;
}

/**
 * Generate Redis Cloud connection configuration
 * The actual database should be created via Redis Cloud console or API
 */
export function createRedisConfig(
	config: InfraConfig,
	redisConfig: RedisCloudConfig,
): RedisOutputs {
	// Redis connection string format
	// redis://user:password@redis-xxxxx.region.cloud.redislabs.com:port
	// This will be obtained from Redis Cloud after database creation
	const connectionString = pulumi.interpolate`redis://default:${config.redis.secretKey}@redis-portfolio.${redisConfig.region}.cloud.redislabs.com:6379`;

	return {
		config: redisConfig,
		connectionString,
	};
}

/**
 * Portfolio Redis Cloud configuration
 */
export function createPortfolioRedisConfig(config: InfraConfig): RedisOutputs {
	return createRedisConfig(config, {
		subscriptionName: "portfolio-subscription",
		databaseName: "portfolio-cache",
		cloudProvider: "AWS",
		region: "ap-northeast-1",
		memoryLimitInGb: 0.03, // 30MB - Free tier
		dataEvictionPolicy: "volatile-lru",
		replication: false,
		dataPersistence: "none",
	});
}

/**
 * Combined database outputs
 */
export interface DatabasesOutputs {
	tidb: TiDBOutputs;
	redis: RedisOutputs;
}

export function createDatabases(config: InfraConfig): DatabasesOutputs {
	return {
		tidb: createPortfolioTiDBConfig(config),
		redis: createPortfolioRedisConfig(config),
	};
}
