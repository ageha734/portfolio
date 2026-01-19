import * as doppler from "@pulumiverse/doppler";
import * as pulumi from "@pulumi/pulumi";

/**
 * Doppler Secret Management
 *
 * Dopplerで一元管理したシークレットをPulumiで取得し、
 * Cloudflare Workers/Pages などに注入するためのモジュール
 */

export interface DopplerConfig {
	project: string;
	config: string; // dev, staging, prod など
}

export interface SecretKeys {
	// Database
	DATABASE_URL: string;
	REDIS_URL?: string;

	// Cloudflare
	CLOUDFLARE_API_TOKEN: string;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_ZONE_ID: string;

	// TiDB Cloud
	TIDB_PUBLIC_KEY: string;
	TIDB_PRIVATE_KEY: string;
	TIDB_PROJECT_ID: string;
	TIDB_HOST: string;

	// Redis Cloud
	REDIS_API_KEY?: string;
	REDIS_SECRET_KEY?: string;

	// Grafana Cloud
	GRAFANA_API_KEY: string;
	GRAFANA_ORG_SLUG: string;

	// Sentry
	SENTRY_AUTH_TOKEN: string;
	SENTRY_ORG: string;
	SENTRY_DSN?: string;

	// Auth (Better Auth)
	BETTER_AUTH_SECRET?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
}

export interface SecretsOutputs {
	secrets: Record<keyof SecretKeys, pulumi.Output<string>>;
	syncedSecrets: Record<string, doppler.Secret>;
}

/**
 * Dopplerからシークレットを取得
 */
export function getDopplerSecrets(
	dopplerConfig: DopplerConfig,
): SecretsOutputs {
	const secretKeys: (keyof SecretKeys)[] = [
		"DATABASE_URL",
		"REDIS_URL",
		"CLOUDFLARE_API_TOKEN",
		"CLOUDFLARE_ACCOUNT_ID",
		"CLOUDFLARE_ZONE_ID",
		"TIDB_PUBLIC_KEY",
		"TIDB_PRIVATE_KEY",
		"TIDB_PROJECT_ID",
		"TIDB_HOST",
		"REDIS_API_KEY",
		"REDIS_SECRET_KEY",
		"GRAFANA_API_KEY",
		"GRAFANA_ORG_SLUG",
		"SENTRY_AUTH_TOKEN",
		"SENTRY_ORG",
		"SENTRY_DSN",
		"BETTER_AUTH_SECRET",
		"GOOGLE_CLIENT_ID",
		"GOOGLE_CLIENT_SECRET",
	];

	const secrets: Record<string, pulumi.Output<string>> = {};
	const syncedSecrets: Record<string, doppler.Secret> = {};

	// Dopplerからシークレットを一括取得
	const dopplerSecrets = doppler.getSecretsOutput({
		project: dopplerConfig.project,
		config: dopplerConfig.config,
	});

	for (const key of secretKeys) {
		// 各シークレットをOutputとして取得
		secrets[key] = dopplerSecrets.apply((s) => s.map[key] || "");
	}

	return {
		secrets: secrets as Record<keyof SecretKeys, pulumi.Output<string>>,
		syncedSecrets,
	};
}

/**
 * Dopplerからシークレットを個別に取得するヘルパー
 */
export function getDopplerSecret(
	project: string,
	config: string,
	secretName: string,
): pulumi.Output<string> {
	const secrets = doppler.getSecretsOutput({
		project,
		config,
	});

	return secrets.apply((s) => s.map[secretName] || "");
}

/**
 * Cloudflare Workers/Pages用の環境変数マップを生成
 */
export function getCloudflareEnvVars(
	secrets: SecretsOutputs["secrets"],
): Record<string, pulumi.Output<string>> {
	return {
		DATABASE_URL: secrets.DATABASE_URL,
		REDIS_URL: secrets.REDIS_URL,
		NODE_ENV: pulumi.output("production"),
		SENTRY_DSN: secrets.SENTRY_DSN,
		BETTER_AUTH_SECRET: secrets.BETTER_AUTH_SECRET,
		GOOGLE_CLIENT_ID: secrets.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: secrets.GOOGLE_CLIENT_SECRET,
	};
}

/**
 * Doppler CLIでローカル開発用の環境変数を取得するコマンド
 *
 * @example
 * ```bash
 * # .envファイルを生成
 * doppler secrets download --no-file --format env > .env
 *
 * # 特定のコマンドを実行
 * doppler run -- bun run dev
 *
 * # プロジェクト・環境を指定
 * doppler run --project portfolio --config dev -- bun run dev
 * ```
 */
export const DOPPLER_CLI_COMMANDS = {
	downloadEnv: "doppler secrets download --no-file --format env > .env",
	runDev: "doppler run -- bun run dev",
	runWithConfig: (project: string, config: string, command: string) =>
		`doppler run --project ${project} --config ${config} -- ${command}`,
};

/**
 * Portfolio用のDoppler設定
 */
export function createPortfolioDopplerConfig(
	environment: "dev" | "staging" | "prod",
): DopplerConfig {
	return {
		project: "portfolio",
		config: environment,
	};
}

/**
 * Dopplerプロジェクトの推奨構成
 */
export const DOPPLER_PROJECT_STRUCTURE = {
	project: "portfolio",
	configs: {
		dev: "開発環境 - ローカル開発用",
		staging: "ステージング環境 - PR/プレビュー用",
		prod: "本番環境 - 本番デプロイ用",
	},
	secrets: [
		// Database
		{ name: "DATABASE_URL", description: "TiDB Cloud接続文字列" },
		{ name: "REDIS_URL", description: "Redis Cloud接続文字列" },

		// Cloudflare
		{ name: "CLOUDFLARE_API_TOKEN", description: "Cloudflare APIトークン" },
		{ name: "CLOUDFLARE_ACCOUNT_ID", description: "CloudflareアカウントID" },
		{ name: "CLOUDFLARE_ZONE_ID", description: "CloudflareゾーンID" },

		// TiDB Cloud
		{ name: "TIDB_PUBLIC_KEY", description: "TiDB Cloud公開キー" },
		{ name: "TIDB_PRIVATE_KEY", description: "TiDB Cloud秘密キー" },
		{ name: "TIDB_PROJECT_ID", description: "TiDB CloudプロジェクトID" },
		{
			name: "TIDB_HOST",
			description: "TiDB Cloudホスト名 (例: gateway01.ap-northeast-1.prod.aws.tidbcloud.com)",
		},

		// Redis Cloud
		{ name: "REDIS_API_KEY", description: "Redis Cloud APIキー" },
		{ name: "REDIS_SECRET_KEY", description: "Redis Cloudシークレットキー" },

		// Grafana Cloud
		{ name: "GRAFANA_API_KEY", description: "Grafana Cloud APIキー" },
		{ name: "GRAFANA_ORG_SLUG", description: "Grafana Cloud組織スラッグ" },

		// Sentry
		{ name: "SENTRY_AUTH_TOKEN", description: "Sentry認証トークン" },
		{ name: "SENTRY_ORG", description: "Sentry組織スラッグ" },
		{ name: "SENTRY_DSN", description: "Sentry DSN" },

		// Auth
		{ name: "BETTER_AUTH_SECRET", description: "Better Auth シークレット" },
		{ name: "GOOGLE_CLIENT_ID", description: "Google OAuth クライアントID" },
		{
			name: "GOOGLE_CLIENT_SECRET",
			description: "Google OAuth クライアントシークレット",
		},
	],
};
