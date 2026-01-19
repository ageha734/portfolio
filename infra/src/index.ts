import * as pulumi from "@pulumi/pulumi";
import { getConfig } from "./config";
import {
	createDatabases,
	createObservability,
	createPortfolioDnsRecords,
	createPortfolioApiWorker,
	createPortfolioPagesProjects,
} from "./resources";

// Load configuration
const config = getConfig();

// ============================================================================
// Databases (TiDB Cloud & Redis Cloud)
// ============================================================================
const databases = createDatabases(config);

// Export database connection strings (for use in other resources)
export const tidbConnectionString = databases.tidb.connectionString;
export const redisConnectionString = databases.redis.connectionString;

// ============================================================================
// Cloudflare DNS Records
// ============================================================================
// IMPORTANT: Only creates records defined in this configuration.
// Existing records in the zone are NOT modified.
const dnsRecords = createPortfolioDnsRecords(config);

// Export DNS record IDs
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

// Export Pages project names
export const pagesProjectNames = pulumi
	.output(pagesProjects.projects)
	.apply((projects) =>
		Object.fromEntries(
			Object.entries(projects).map(([key, project]) => [key, project.name]),
		),
	);

// Export Pages domain names
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

// Export Worker script names
export const workerScriptNames = pulumi
	.output(workers.scripts)
	.apply((scripts) =>
		Object.fromEntries(
			Object.entries(scripts).map(([key, script]) => [key, script.name]),
		),
	);

// Export Worker domain names
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

// Export Grafana folder UIDs
export const grafanaFolderUids = pulumi
	.output(observability.grafana.folders)
	.apply((folders) =>
		Object.fromEntries(
			Object.entries(folders).map(([key, folder]) => [key, folder.uid]),
		),
	);

// Export Grafana dashboard UIDs
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

// Export Sentry DSN
export const sentryDsn = observability.sentry.dsn;

// Export Sentry project slugs
export const sentryProjectSlugs = observability.sentry.projects.map(
	(p) => p.slug,
);

// ============================================================================
// Summary Outputs
// ============================================================================
export const summary = {
	environment: config.environment,
	domain: config.cloudflare.domain,
	databases: {
		tidb: {
			type: databases.tidb.clusterConfig.clusterType,
			region: databases.tidb.clusterConfig.region,
		},
		redis: {
			name: databases.redis.config.databaseName,
			region: databases.redis.config.region,
		},
	},
	cloudflare: {
		zoneId: config.cloudflare.zoneId,
		accountId: config.cloudflare.accountId,
	},
};
