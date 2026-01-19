import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";
import type { SecretsOutputs } from "./secrets";

/**
 * TiDB Cloud Serverless Configuration
 *
 * TiDB Serverless は AWS Tokyo (ap-northeast-1) リージョンで利用可能
 * 接続情報は Doppler で一元管理
 *
 * @see https://docs.pingcap.com/tidbcloud/select-cluster-tier#serverless
 */

// TiDB Serverless の利用可能リージョン
export const TIDB_SERVERLESS_REGIONS = {
	AWS: [
		"ap-northeast-1", // Tokyo
		"ap-southeast-1", // Singapore
		"eu-central-1", // Frankfurt
		"us-east-1", // N. Virginia
		"us-west-2", // Oregon
	],
	GCP: [
		"us-central1",
		"us-east1",
		"europe-west1",
		"asia-southeast1",
	],
} as const;

export interface TiDBServerlessConfig {
	name: string;
	cloudProvider: "AWS" | "GCP";
	region: string;
	database: string;
	// Serverless spending limit (0 = free tier)
	spendingLimitMonthly?: number;
}

export interface TiDBOutputs {
	clusterConfig: TiDBServerlessConfig;
	connectionString: pulumi.Output<string>;
	host: pulumi.Output<string>;
}

/**
 * TiDB Serverless 接続設定
 *
 * Doppler から DATABASE_URL を取得するか、
 * 個別の認証情報から接続文字列を生成
 */
export function createTiDBServerlessConfig(
	clusterConfig: TiDBServerlessConfig,
	secrets?: {
		databaseUrl?: pulumi.Output<string>;
		user?: pulumi.Output<string>;
		password?: pulumi.Output<string>;
		host?: pulumi.Output<string>;
	},
): TiDBOutputs {
	// Doppler から DATABASE_URL が提供されている場合はそれを使用
	if (secrets?.databaseUrl) {
		return {
			clusterConfig,
			connectionString: secrets.databaseUrl,
			host: secrets.host || pulumi.output(`gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`),
		};
	}

	// 個別の認証情報から接続文字列を生成
	const host = secrets?.host || pulumi.output(`gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`);
	const connectionString = pulumi.interpolate`mysql://${secrets?.user || ""}:${secrets?.password || ""}@${host}:4000/${clusterConfig.database}?sslaccept=strict`;

	return {
		clusterConfig,
		connectionString,
		host,
	};
}

/**
 * Portfolio TiDB Serverless configuration
 *
 * リージョン: AWS Tokyo (ap-northeast-1)
 * プラン: Serverless (Free Tier)
 */
export function createPortfolioTiDBConfig(
	secrets?: SecretsOutputs["secrets"],
): TiDBOutputs {
	return createTiDBServerlessConfig(
		{
			name: "portfolio-db",
			cloudProvider: "AWS",
			region: "ap-northeast-1", // Tokyo
			database: "portfolio",
			spendingLimitMonthly: 0, // Free tier
		},
		secrets
			? {
					databaseUrl: secrets.DATABASE_URL,
					host: secrets.TIDB_HOST,
				}
			: undefined,
	);
}

/**
 * TiDB Serverless クラスタ作成時の推奨設定
 *
 * TiDB Cloud Console で手動作成する場合の参考情報
 */
export const TIDB_SERVERLESS_RECOMMENDATIONS = {
	// Tokyo リージョンでの推奨設定
	tokyo: {
		cloudProvider: "AWS",
		region: "ap-northeast-1",
		tier: "Serverless",
		// Free tier 制限
		freeTierLimits: {
			rowStorageGiB: 5,
			requestUnitsPerMonth: 50_000_000, // 5000万 RU/月
		},
	},
	// 接続設定
	connection: {
		port: 4000,
		sslMode: "VERIFY_IDENTITY",
		// 接続プーリング推奨設定
		pooling: {
			minConnections: 1,
			maxConnections: 10,
			idleTimeoutMs: 60000,
		},
	},
};

/**
 * Redis Cloud Configuration
 *
 * 接続情報は Doppler で一元管理
 */

export interface RedisCloudConfig {
	subscriptionName: string;
	databaseName: string;
	cloudProvider: "AWS" | "GCP" | "AZURE";
	region: string;
	memoryLimitInGb?: number;
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
	dataPersistence?:
		| "none"
		| "aof-every-write"
		| "aof-every-1-second"
		| "snapshot-every-1-hour"
		| "snapshot-every-6-hours"
		| "snapshot-every-12-hours";
}

export interface RedisOutputs {
	config: RedisCloudConfig;
	connectionString: pulumi.Output<string>;
}

/**
 * Redis Cloud 接続設定
 *
 * Doppler から REDIS_URL を取得
 */
export function createRedisCloudConfig(
	redisConfig: RedisCloudConfig,
	secrets?: {
		redisUrl?: pulumi.Output<string>;
	},
): RedisOutputs {
	// Doppler から REDIS_URL が提供されている場合はそれを使用
	const connectionString =
		secrets?.redisUrl || pulumi.output("");

	return {
		config: redisConfig,
		connectionString,
	};
}

/**
 * Portfolio Redis Cloud configuration
 *
 * リージョン: AWS Tokyo (ap-northeast-1)
 * プラン: Free Tier (30MB)
 */
export function createPortfolioRedisConfig(
	secrets?: SecretsOutputs["secrets"],
): RedisOutputs {
	return createRedisCloudConfig(
		{
			subscriptionName: "portfolio-subscription",
			databaseName: "portfolio-cache",
			cloudProvider: "AWS",
			region: "ap-northeast-1", // Tokyo
			memoryLimitInGb: 0.03, // 30MB - Free tier
			dataEvictionPolicy: "volatile-lru",
			replication: false,
			dataPersistence: "none",
		},
		secrets
			? {
					redisUrl: secrets.REDIS_URL,
				}
			: undefined,
	);
}

/**
 * Combined database outputs
 */
export interface DatabasesOutputs {
	tidb: TiDBOutputs;
	redis: RedisOutputs;
}

/**
 * Doppler からシークレットを取得してデータベース設定を作成
 */
export function createDatabases(
	secrets?: SecretsOutputs["secrets"],
): DatabasesOutputs {
	return {
		tidb: createPortfolioTiDBConfig(secrets),
		redis: createPortfolioRedisConfig(secrets),
	};
}
