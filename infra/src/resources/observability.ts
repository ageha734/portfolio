import * as grafana from "@pulumiverse/grafana";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config";

/**
 * Grafana Cloud Resources
 */

export interface GrafanaStackConfig {
	name: string;
	slug: string;
	regionSlug?: string;
	description?: string;
}

export interface GrafanaDashboardConfig {
	title: string;
	folder?: string;
	configJson: string;
}

export interface GrafanaAlertConfig {
	name: string;
	folderUid?: string;
	ruleGroup: string;
	condition: string;
	queries: Array<{
		refId: string;
		datasourceUid: string;
		model: Record<string, unknown>;
	}>;
}

export interface GrafanaOutputs {
	stack?: grafana.cloud.Stack;
	dashboards: Record<string, grafana.oss.Dashboard>;
	folders: Record<string, grafana.oss.Folder>;
}

/**
 * Create Grafana Cloud stack and resources
 */
export function createGrafanaResources(
	config: InfraConfig,
	stackConfig: GrafanaStackConfig,
	dashboards: GrafanaDashboardConfig[] = [],
): GrafanaOutputs {
	const createdDashboards: Record<string, grafana.oss.Dashboard> = {};
	const createdFolders: Record<string, grafana.oss.Folder> = {};

	// Create folder for portfolio dashboards
	const portfolioFolder = new grafana.oss.Folder("grafana-folder-portfolio", {
		title: "Portfolio",
	});
	createdFolders["portfolio"] = portfolioFolder;

	// Create dashboards
	for (const dashboard of dashboards) {
		const resourceName = `grafana-dashboard-${dashboard.title.toLowerCase().replace(/\s+/g, "-")}`;
		createdDashboards[resourceName] = new grafana.oss.Dashboard(resourceName, {
			folder: portfolioFolder.uid,
			configJson: dashboard.configJson,
		});
	}

	return {
		dashboards: createdDashboards,
		folders: createdFolders,
	};
}

/**
 * Portfolio Grafana dashboards
 */
export function createPortfolioGrafanaResources(
	config: InfraConfig,
): GrafanaOutputs {
	const dashboards: GrafanaDashboardConfig[] = [
		{
			title: "API Performance",
			configJson: JSON.stringify({
				title: "Portfolio API Performance",
				uid: "portfolio-api-perf",
				panels: [
					{
						id: 1,
						title: "Request Rate",
						type: "timeseries",
						gridPos: { h: 8, w: 12, x: 0, y: 0 },
					},
					{
						id: 2,
						title: "Response Time",
						type: "timeseries",
						gridPos: { h: 8, w: 12, x: 12, y: 0 },
					},
					{
						id: 3,
						title: "Error Rate",
						type: "stat",
						gridPos: { h: 4, w: 6, x: 0, y: 8 },
					},
					{
						id: 4,
						title: "Active Users",
						type: "stat",
						gridPos: { h: 4, w: 6, x: 6, y: 8 },
					},
				],
				schemaVersion: 39,
				version: 1,
			}),
		},
		{
			title: "Database Metrics",
			configJson: JSON.stringify({
				title: "Portfolio Database Metrics",
				uid: "portfolio-db-metrics",
				panels: [
					{
						id: 1,
						title: "Query Latency",
						type: "timeseries",
						gridPos: { h: 8, w: 12, x: 0, y: 0 },
					},
					{
						id: 2,
						title: "Connection Pool",
						type: "gauge",
						gridPos: { h: 8, w: 12, x: 12, y: 0 },
					},
				],
				schemaVersion: 39,
				version: 1,
			}),
		},
	];

	return createGrafanaResources(
		config,
		{
			name: "portfolio",
			slug: config.grafana.stackSlug,
			description: "Portfolio project monitoring",
		},
		dashboards,
	);
}

/**
 * Sentry Configuration
 *
 * Note: Sentry doesn't have an official Pulumi provider.
 * We provide configuration for API-based management.
 */

export interface SentryProjectConfig {
	name: string;
	slug: string;
	platform:
		| "javascript"
		| "javascript-nextjs"
		| "javascript-react"
		| "node"
		| "node-hono"
		| "node-cloudflare-workers";
	team: string;
}

export interface SentryAlertConfig {
	name: string;
	conditions: Array<{
		id: string;
		interval?: string;
		value?: number;
	}>;
	actions: Array<{
		id: string;
		targetIdentifier?: string;
		targetType?: string;
	}>;
	frequency?: number;
}

export interface SentryOutputs {
	projects: SentryProjectConfig[];
	alerts: SentryAlertConfig[];
	dsn: pulumi.Output<string>;
}

/**
 * Generate Sentry configuration
 * The actual projects should be created via Sentry console or API
 */
export function createSentryConfig(
	config: InfraConfig,
	projects: SentryProjectConfig[],
	alerts: SentryAlertConfig[] = [],
): SentryOutputs {
	// Sentry DSN format
	// https://key@org.ingest.sentry.io/project-id
	const dsn = pulumi.interpolate`https://${config.sentry.authToken}@${config.sentry.org}.ingest.sentry.io/portfolio`;

	return {
		projects,
		alerts,
		dsn,
	};
}

/**
 * Portfolio Sentry configuration
 */
export function createPortfolioSentryConfig(config: InfraConfig): SentryOutputs {
	const projects: SentryProjectConfig[] = [
		{
			name: "Portfolio Web",
			slug: "portfolio-web",
			platform: "javascript-nextjs",
			team: "portfolio",
		},
		{
			name: "Portfolio API",
			slug: "portfolio-api",
			platform: "node-cloudflare-workers",
			team: "portfolio",
		},
		{
			name: "Portfolio Admin",
			slug: "portfolio-admin",
			platform: "javascript-react",
			team: "portfolio",
		},
	];

	const alerts: SentryAlertConfig[] = [
		{
			name: "High Error Rate",
			conditions: [
				{
					id: "sentry.rules.conditions.event_frequency.EventFrequencyCondition",
					interval: "1h",
					value: 100,
				},
			],
			actions: [
				{
					id: "sentry.mail.actions.NotifyEmailAction",
					targetType: "Team",
					targetIdentifier: "portfolio",
				},
			],
			frequency: 60, // minutes
		},
		{
			name: "Performance Degradation",
			conditions: [
				{
					id: "sentry.rules.conditions.event_frequency.EventFrequencyPercentCondition",
					interval: "1h",
					value: 50, // 50% increase
				},
			],
			actions: [
				{
					id: "sentry.mail.actions.NotifyEmailAction",
					targetType: "Team",
					targetIdentifier: "portfolio",
				},
			],
			frequency: 120,
		},
	];

	return createSentryConfig(config, projects, alerts);
}

/**
 * Combined observability outputs
 */
export interface ObservabilityOutputs {
	grafana: GrafanaOutputs;
	sentry: SentryOutputs;
}

export function createObservability(config: InfraConfig): ObservabilityOutputs {
	return {
		grafana: createPortfolioGrafanaResources(config),
		sentry: createPortfolioSentryConfig(config),
	};
}
