import * as pulumi from "@pulumi/pulumi";
import { getConfig, getDopplerSecrets, useDoppler } from "./config";
import {
	createDatabases,
	createObservability,
	createPortfolioDnsRecords,
	createPortfolioApiWorker,
	createPortfolioPagesProjects,
	getCloudflareEnvVars,
	TIDB_SERVERLESS_RECOMMENDATIONS,
} from "./resources";

// ============================================================================
// Configuration
// ============================================================================
const config = getConfig();

// Doppler からシークレットを取得（有効な場合）
const dopplerSecrets = useDoppler ? getDopplerSecrets() : undefined;

// secrets.ts の SecretsOutputs["secrets"] 型に変換
const secrets = dopplerSecrets
	? {
			DATABASE_URL: dopplerSecrets.DATABASE_URL,
			REDIS_URL: dopplerSecrets.REDIS_URL,
			CLOUDFLARE_API_TOKEN: dopplerSecrets.CLOUDFLARE_API_TOKEN,
			CLOUDFLARE_ACCOUNT_ID: dopplerSecrets.CLOUDFLARE_ACCOUNT_ID,
			CLOUDFLARE_ZONE_ID: dopplerSecrets.CLOUDFLARE_ZONE_ID,
			TIDB_PUBLIC_KEY: pulumi.output(""),
			TIDB_PRIVATE_KEY: pulumi.output(""),
			TIDB_PROJECT_ID: pulumi.output(""),
			TIDB_HOST: dopplerSecrets.TIDB_HOST,
			REDIS_API_KEY: pulumi.output(""),
			REDIS_SECRET_KEY: pulumi.output(""),
			GRAFANA_API_KEY: dopplerSecrets.GRAFANA_API_KEY,
			GRAFANA_ORG_SLUG: dopplerSecrets.GRAFANA_ORG_SLUG,
			SENTRY_AUTH_TOKEN: dopplerSecrets.SENTRY_AUTH_TOKEN,
			SENTRY_ORG: dopplerSecrets.SENTRY_ORG,
			SENTRY_DSN: dopplerSecrets.SENTRY_DSN,
			BETTER_AUTH_SECRET: dopplerSecrets.BETTER_AUTH_SECRET,
			GOOGLE_CLIENT_ID: dopplerSecrets.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: dopplerSecrets.GOOGLE_CLIENT_SECRET,
		}
	: undefined;

// ============================================================================
// Databases (TiDB Cloud Serverless & Redis Cloud)
// ============================================================================
// TiDB: AWS Tokyo (ap-northeast-1), Serverless Free Tier
// Redis: AWS Tokyo (ap-northeast-1), Free Tier 30MB
const databases = createDatabases(secrets);

// Export database connection strings
export const tidbConnectionString = databases.tidb.connectionString;
export const tidbHost = databases.tidb.host;
export const redisConnectionString = databases.redis.connectionString;

// Export TiDB cluster info
export const tidbClusterInfo = {
	name: databases.tidb.clusterConfig.name,
	cloudProvider: databases.tidb.clusterConfig.cloudProvider,
	region: databases.tidb.clusterConfig.region,
	database: databases.tidb.clusterConfig.database,
	tier: "Serverless",
	recommendations: TIDB_SERVERLESS_RECOMMENDATIONS,
};

// ============================================================================
// Cloudflare DNS Records
// ============================================================================
// IMPORTANT: Only creates records defined here. Existing records are NOT modified.
const dnsRecords = createPortfolioDnsRecords(config);

export const dnsRecordIds = pulumi.output(dnsRecords.records).apply((records) =>
	Object.fromEntries(
		Object.entries(records).map(([key, record]) => [key, record.id]),
	),
);

// ============================================================================
// Cloudflare Pages Projects
// ============================================================================
const pagesProjects = createPortfolioPagesProjects(config, {
	databaseUrl: databases.tidb.connectionString,
	redisUrl: databases.redis.connectionString,
});

export const pagesProjectNames = pulumi
	.output(pagesProjects.projects)
	.apply((projects) =>
		Object.fromEntries(
			Object.entries(projects).map(([key, project]) => [key, project.name]),
		),
	);

export const pagesDomainNames = pulumi
	.output(pagesProjects.domains)
	.apply((domains) =>
		Object.fromEntries(
			Object.entries(domains).map(([key, domain]) => [key, domain.domain]),
		),
	);

// ============================================================================
// Cloudflare Workers
// ============================================================================
const workers = createPortfolioApiWorker(config, {
	databaseUrl: databases.tidb.connectionString,
	redisUrl: databases.redis.connectionString,
});

export const workerScriptNames = pulumi
	.output(workers.scripts)
	.apply((scripts) =>
		Object.fromEntries(
			Object.entries(scripts).map(([key, script]) => [key, script.name]),
		),
	);

export const workerDomainNames = pulumi
	.output(workers.domains)
	.apply((domains) =>
		Object.fromEntries(
			Object.entries(domains).map(([key, domain]) => [key, domain.hostname]),
		),
	);

// ============================================================================
// Observability (Grafana Cloud & Sentry)
// ============================================================================
const observability = createObservability(config);

export const grafanaFolderUids = pulumi
	.output(observability.grafana.folders)
	.apply((folders) =>
		Object.fromEntries(
			Object.entries(folders).map(([key, folder]) => [key, folder.uid]),
		),
	);

export const grafanaDashboardUids = pulumi
	.output(observability.grafana.dashboards)
	.apply((dashboards) =>
		Object.fromEntries(
			Object.entries(dashboards).map(([key, dashboard]) => [
				key,
				dashboard.uid,
			]),
		),
	);

export const sentryDsn = observability.sentry.dsn;
export const sentryProjectSlugs = observability.sentry.projects.map(
	(p) => p.slug,
);

// ============================================================================
// Doppler Integration Info
// ============================================================================
export const dopplerInfo = {
	enabled: useDoppler,
	// Doppler CLI commands for local development
	commands: {
		downloadEnv: "doppler secrets download --no-file --format env > .env",
		runDev: "doppler run -- bun run dev",
		runWithProject: "doppler run --project portfolio --config dev -- bun run dev",
	},
};

// ============================================================================
// Cloudflare Environment Variables (for Workers/Pages)
// ============================================================================
// These can be injected via Doppler -> Pulumi -> Cloudflare
export const cloudflareEnvVars = secrets
	? getCloudflareEnvVars(secrets)
	: undefined;

// ============================================================================
// Summary
// ============================================================================
export const summary = {
	environment: config.environment,
	domain: config.cloudflare.domain,
	secretsManagement: useDoppler ? "Doppler" : "Pulumi Config",
	databases: {
		tidb: {
			type: "Serverless",
			cloudProvider: "AWS",
			region: "ap-northeast-1 (Tokyo)",
		},
		redis: {
			name: databases.redis.config.databaseName,
			cloudProvider: "AWS",
			region: "ap-northeast-1 (Tokyo)",
		},
	},
	cloudflare: {
		accountId: config.cloudflare.accountId,
	},
};
