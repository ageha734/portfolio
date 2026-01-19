import * as doppler from "@pulumiverse/doppler";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const cloudflareConfig = new pulumi.Config("cloudflare");
const dopplerConfig = new pulumi.Config("doppler");

/**
 * Doppler を使用するかどうか
 * 設定されていない場合は従来の Pulumi Config を使用
 */
export const useDoppler = config.getBoolean("useDoppler") ?? true;

/**
 * Doppler プロジェクト/環境設定
 */
export interface DopplerSettings {
	project: string;
	config: string; // dev, staging, prod
}

export function getDopplerSettings(): DopplerSettings {
	return {
		project: dopplerConfig.get("project") || "portfolio",
		config: dopplerConfig.get("config") || config.require("environment"),
	};
}

/**
 * Doppler からシークレットを取得
 */
export function getDopplerSecrets() {
	const settings = getDopplerSettings();

	const secrets = doppler.getSecretsOutput({
		project: settings.project,
		config: settings.config,
	});

	return {
		// Database
		DATABASE_URL: secrets.apply((s) => s.map.DATABASE_URL || ""),
		REDIS_URL: secrets.apply((s) => s.map.REDIS_URL || ""),
		TIDB_HOST: secrets.apply((s) => s.map.TIDB_HOST || ""),

		// Cloudflare
		CLOUDFLARE_API_TOKEN: secrets.apply(
			(s) => s.map.CLOUDFLARE_API_TOKEN || "",
		),
		CLOUDFLARE_ACCOUNT_ID: secrets.apply(
			(s) => s.map.CLOUDFLARE_ACCOUNT_ID || "",
		),
		CLOUDFLARE_ZONE_ID: secrets.apply((s) => s.map.CLOUDFLARE_ZONE_ID || ""),

		// Grafana
		GRAFANA_API_KEY: secrets.apply((s) => s.map.GRAFANA_API_KEY || ""),
		GRAFANA_ORG_SLUG: secrets.apply((s) => s.map.GRAFANA_ORG_SLUG || ""),

		// Sentry
		SENTRY_AUTH_TOKEN: secrets.apply((s) => s.map.SENTRY_AUTH_TOKEN || ""),
		SENTRY_ORG: secrets.apply((s) => s.map.SENTRY_ORG || ""),
		SENTRY_DSN: secrets.apply((s) => s.map.SENTRY_DSN || ""),

		// Auth
		BETTER_AUTH_SECRET: secrets.apply((s) => s.map.BETTER_AUTH_SECRET || ""),
		GOOGLE_CLIENT_ID: secrets.apply((s) => s.map.GOOGLE_CLIENT_ID || ""),
		GOOGLE_CLIENT_SECRET: secrets.apply(
			(s) => s.map.GOOGLE_CLIENT_SECRET || "",
		),
	};
}

/**
 * 従来の Pulumi Config から設定を取得
 * Doppler を使用しない場合のフォールバック
 */
export interface InfraConfig {
	environment: string;
	cloudflare: {
		apiToken: pulumi.Output<string>;
		accountId: pulumi.Output<string> | string;
		zoneId: pulumi.Output<string> | string;
		domain: string;
	};
	grafana: {
		apiKey: pulumi.Output<string>;
		orgSlug: pulumi.Output<string> | string;
		stackSlug: string;
	};
	sentry: {
		authToken: pulumi.Output<string>;
		org: pulumi.Output<string> | string;
	};
}

export function getConfig(): InfraConfig {
	const environment = config.require("environment");

	// Doppler を使用する場合
	if (useDoppler) {
		const secrets = getDopplerSecrets();
		return {
			environment,
			cloudflare: {
				apiToken: secrets.CLOUDFLARE_API_TOKEN,
				accountId: secrets.CLOUDFLARE_ACCOUNT_ID,
				zoneId: secrets.CLOUDFLARE_ZONE_ID,
				domain: config.get("cloudflareDomain") || "ageha734.jp",
			},
			grafana: {
				apiKey: secrets.GRAFANA_API_KEY,
				orgSlug: secrets.GRAFANA_ORG_SLUG,
				stackSlug: config.get("grafanaStackSlug") || "portfolio",
			},
			sentry: {
				authToken: secrets.SENTRY_AUTH_TOKEN,
				org: secrets.SENTRY_ORG,
			},
		};
	}

	// 従来の Pulumi Config を使用
	return {
		environment,
		cloudflare: {
			apiToken: cloudflareConfig.requireSecret("apiToken"),
			accountId: config.require("cloudflareAccountId"),
			zoneId: config.require("cloudflareZoneId"),
			domain: config.get("cloudflareDomain") || "ageha734.jp",
		},
		grafana: {
			apiKey: config.requireSecret("grafanaApiKey"),
			orgSlug: config.require("grafanaOrgSlug"),
			stackSlug: config.get("grafanaStackSlug") || "portfolio",
		},
		sentry: {
			authToken: config.requireSecret("sentryAuthToken"),
			org: config.require("sentryOrg"),
		},
	};
}

export function getTags(resourceName: string): Record<string, string> {
	const environment = config.require("environment");
	return {
		Environment: environment,
		Project: "portfolio",
		ManagedBy: "pulumi",
		Resource: resourceName,
	};
}
