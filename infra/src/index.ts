import * as pulumi from "@pulumi/pulumi";
import { getDopplerSecrets, getConfig } from "./config";
import {
	TIDB_ALLOWED_REGIONS,
	TIDB_SERVERLESS_RECOMMENDATIONS,
	createPortfolioTiDBConfig,
} from "./resources/databases";
import { createPortfolioRedisConfig } from "./resources/cache";
import { createPortfolioDnsRecords } from "./resources/dns";
import { createObservability } from "./resources/observability";
import { createPortfolioPagesProjects } from "./resources/pages";
import { getCloudflareEnvVars } from "./resources/secrets";
import { createPortfolioApiWorker } from "./resources/workers";

const config = getConfig();

const dopplerSecrets = getDopplerSecrets();

const secrets = {
	DATABASE_URL: dopplerSecrets.DATABASE_URL,
	REDIS_URL: dopplerSecrets.REDIS_URL,
	CLOUDFLARE_API_TOKEN: dopplerSecrets.CLOUDFLARE_API_TOKEN,
	CLOUDFLARE_ACCOUNT_ID: dopplerSecrets.CLOUDFLARE_ACCOUNT_ID,
	CLOUDFLARE_ZONE_ID: dopplerSecrets.CLOUDFLARE_ZONE_ID,
	TIDB_HOST: dopplerSecrets.TIDB_HOST,
	GRAFANA_API_KEY: dopplerSecrets.GRAFANA_API_KEY,
	GRAFANA_ORG_SLUG: dopplerSecrets.GRAFANA_ORG_SLUG,
	SENTRY_AUTH_TOKEN: dopplerSecrets.SENTRY_AUTH_TOKEN,
	SENTRY_ORG: dopplerSecrets.SENTRY_ORG,
	SENTRY_DSN: dopplerSecrets.SENTRY_DSN,
	BETTER_AUTH_SECRET: dopplerSecrets.BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_ID: dopplerSecrets.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: dopplerSecrets.GOOGLE_CLIENT_SECRET,
};

const tidb = createPortfolioTiDBConfig(secrets);
const redis = createPortfolioRedisConfig(secrets);

export const tidbConnectionString = tidb.connectionString;
export const tidbHost = tidb.host;
export const redisConnectionString = redis.connectionString;

export const tidbClusterInfo = {
	name: tidb.clusterConfig.name,
	cloudProvider: tidb.clusterConfig.cloudProvider,
	region: tidb.clusterConfig.region,
	database: tidb.clusterConfig.database,
	tier: "Serverless",
	allowedRegions: TIDB_ALLOWED_REGIONS,
	recommendations: TIDB_SERVERLESS_RECOMMENDATIONS,
};

const dnsRecords = createPortfolioDnsRecords(config);

export const dnsRecordIds = pulumi.output(dnsRecords.records).apply((records) =>
	Object.fromEntries(
		Object.entries(records).map(([key, record]) => [key, record.id]),
	),
);

const pagesProjects = createPortfolioPagesProjects(config, {
	databaseUrl: tidb.connectionString,
	redisUrl: redis.connectionString,
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

const workers = createPortfolioApiWorker(config, {
	databaseUrl: tidb.connectionString,
	redisUrl: redis.connectionString,
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
export const sentryTeamSlug = observability.sentry.team.slug;
export const sentryProjectSlugs = Object.fromEntries(
	Object.entries(observability.sentry.projects).map(([key, project]) => [key, project.slug]),
);

export const dopplerInfo = {
	commands: {
		downloadEnv: "doppler secrets download --no-file --format env > .env",
		runDev: "doppler run -- bun run dev",
		runWithProject: "doppler run --project portfolio --config dev -- bun run dev",
	},
};

export const cloudflareEnvVars = getCloudflareEnvVars(secrets);

export const summary = {
	environment: config.environment,
	domain: config.cloudflare.domain,
	secretsManagement: "Doppler",
	databases: {
		tidb: {
			type: "Serverless",
			cloudProvider: "AWS",
			region: "ap-northeast-1",
		},
		redis: {
			name: redis.database.name,
			subscription: redis.subscription.name,
		},
	},
	cloudflare: {
		accountId: config.cloudflare.accountId,
	},
};
