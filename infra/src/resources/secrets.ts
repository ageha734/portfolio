import * as pulumi from "@pulumi/pulumi";
import * as doppler from "@pulumiverse/doppler";

export interface DopplerConfig {
	project: string;
	config: string;
}

export interface SecretKeys {
	DATABASE_URL: string;
	REDIS_URL?: string;
	CLOUDFLARE_API_TOKEN: string;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_ZONE_ID: string;
	TIDB_HOST: string;
	GRAFANA_API_KEY: string;
	GRAFANA_ORG_SLUG: string;
	SENTRY_AUTH_TOKEN: string;
	SENTRY_ORG: string;
	SENTRY_DSN?: string;
	BETTER_AUTH_SECRET?: string;
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
}

export interface SecretsOutputs {
	secrets: Record<keyof SecretKeys, pulumi.Output<string>>;
	syncedSecrets: Record<string, doppler.Secret>;
}

export function getDopplerSecrets(
	dopplerConfig: DopplerConfig,
): SecretsOutputs {
	const secretKeys: (keyof SecretKeys)[] = [
		"DATABASE_URL",
		"REDIS_URL",
		"CLOUDFLARE_API_TOKEN",
		"CLOUDFLARE_ACCOUNT_ID",
		"CLOUDFLARE_ZONE_ID",
		"TIDB_HOST",
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

	const dopplerSecrets = doppler.getSecretsOutput({
		project: dopplerConfig.project,
		config: dopplerConfig.config,
	});

	for (const key of secretKeys) {
		secrets[key] = dopplerSecrets.apply((s) => s.map[key] || "");
	}

	return {
		secrets: secrets as Record<keyof SecretKeys, pulumi.Output<string>>,
		syncedSecrets,
	};
}

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

export const DOPPLER_CLI_COMMANDS = {
	downloadEnv: "doppler secrets download --no-file --format env > .env",
	runDev: "doppler run -- bun run dev",
	runWithConfig: (project: string, config: string, command: string) =>
		`doppler run --project ${project} --config ${config} -- ${command}`,
};

export function createPortfolioDopplerConfig(
	environment: "rc" | "stg" | "prd",
): DopplerConfig {
	return {
		project: "portfolio",
		config: environment,
	};
}

export const DOPPLER_PROJECT_STRUCTURE = {
	project: "portfolio",
	configs: {
		rc: "開発環境",
		stg: "検証環境",
		prd: "本番環境",
	},
	secrets: [
		{ name: "DATABASE_URL", description: "TiDB Cloud接続文字列" },
		{ name: "REDIS_URL", description: "Redis Cloud接続文字列" },
		{ name: "CLOUDFLARE_API_TOKEN", description: "Cloudflare APIトークン" },
		{ name: "CLOUDFLARE_ACCOUNT_ID", description: "CloudflareアカウントID" },
		{ name: "CLOUDFLARE_ZONE_ID", description: "CloudflareゾーンID" },
		{ name: "TIDB_HOST", description: "TiDB Cloudホスト名" },
		{ name: "GRAFANA_API_KEY", description: "Grafana Cloud APIキー" },
		{ name: "GRAFANA_ORG_SLUG", description: "Grafana Cloud組織スラッグ" },
		{ name: "SENTRY_AUTH_TOKEN", description: "Sentry認証トークン" },
		{ name: "SENTRY_ORG", description: "Sentry組織スラッグ" },
		{ name: "SENTRY_DSN", description: "Sentry DSN" },
		{ name: "BETTER_AUTH_SECRET", description: "Better Auth シークレット" },
		{ name: "GOOGLE_CLIENT_ID", description: "Google OAuth クライアントID" },
		{ name: "GOOGLE_CLIENT_SECRET", description: "Google OAuth クライアントシークレット" },
	],
};

export interface DopplerProjectOutputs {
	project: doppler.Project;
	environments: Record<string, doppler.Environment>;
}

/**
 * Dopplerプロジェクトと環境（rc, stg, prd）を作成する
 * @param projectName プロジェクト名（デフォルト: "portfolio"）
 * @param description プロジェクトの説明
 * @returns Dopplerプロジェクトと環境のリソース
 */
export function createDopplerProject(
	projectName: string = "portfolio",
	description: string = "Portfolio infrastructure project",
): DopplerProjectOutputs {
	const project = new doppler.Project(`${projectName}-doppler-project`, {
		name: projectName,
		description,
	});

	const environments: Record<string, doppler.Environment> = {
		rc: new doppler.Environment(`${projectName}-doppler-env-rc`, {
			project: project.name,
			slug: "rc",
			name: "開発環境",
		}),
		stg: new doppler.Environment(`${projectName}-doppler-env-stg`, {
			project: project.name,
			slug: "stg",
			name: "検証環境",
		}),
		prd: new doppler.Environment(`${projectName}-doppler-env-prd`, {
			project: project.name,
			slug: "prd",
			name: "本番環境",
		}),
	};

	return {
		project,
		environments,
	};
}
