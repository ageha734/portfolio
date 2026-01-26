import * as pulumi from "@pulumi/pulumi";
import * as grafana from "@pulumiverse/grafana";
import * as sentry from "@pulumiverse/sentry";
import type { InfraConfig } from "../config.js";
import { getProjectName } from "../config.js";

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

export function createGrafanaResources(
    _config: InfraConfig,
    _stackConfig: GrafanaStackConfig,
    dashboards: GrafanaDashboardConfig[] = [],
    provider?: grafana.Provider,
): GrafanaOutputs {
    const createdDashboards: Record<string, grafana.oss.Dashboard> = {};
    const createdFolders: Record<string, grafana.oss.Folder> = {};
    const projectName = getProjectName();
    const folderTitle = projectName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const projectFolder = new grafana.oss.Folder(
        `grafana-folder-${projectName}`,
        {
            title: folderTitle,
        },
        {
            provider,
        },
    );
    createdFolders[projectName] = projectFolder;

    for (const dashboard of dashboards) {
        const resourceName = `grafana-dashboard-${dashboard.title.toLowerCase().replaceAll(/\s+/g, "-")}`;
        createdDashboards[resourceName] = new grafana.oss.Dashboard(
            resourceName,
            {
                folder: projectFolder.uid,
                configJson: dashboard.configJson,
            },
            {
                provider,
            },
        );
    }

    return {
        dashboards: createdDashboards,
        folders: createdFolders,
    };
}

export function createPortfolioGrafanaResources(config: InfraConfig, provider?: grafana.Provider): GrafanaOutputs {
    const projectName = getProjectName();
    const projectDisplayName = projectName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const dashboards: GrafanaDashboardConfig[] = [
        {
            title: "API Performance",
            configJson: JSON.stringify({
                title: `${projectDisplayName} API Performance`,
                uid: `${projectName}-api-perf`,
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
                title: `${projectDisplayName} Database Metrics`,
                uid: `${projectName}-db-metrics`,
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
            name: projectName,
            slug: config.grafana.stackSlug,
            description: `${projectDisplayName} project monitoring`,
        },
        dashboards,
        provider,
    );
}

export interface SentryOutputs {
    team: sentry.SentryTeam;
    projects: Record<string, sentry.SentryProject>;
    dsn: pulumi.Output<string>;
}

export function createPortfolioSentryConfig(config: InfraConfig, provider?: sentry.Provider): SentryOutputs {
    const projectName = getProjectName();
    const projectDisplayName = projectName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const team = new sentry.SentryTeam(
        `${projectName}-team`,
        {
            organization: config.sentry.org,
            slug: projectName,
            name: projectDisplayName,
        },
        provider ? { provider } : undefined,
    );

    const projects: Record<string, sentry.SentryProject> = {};

    const webProject = new sentry.SentryProject(
        `${projectName}-web-project`,
        {
            organization: config.sentry.org,
            teams: [team.slug],
            name: `${projectDisplayName} Web`,
            slug: `${projectName}-web`,
            platform: "javascript-nextjs",
        },
        provider ? { provider } : undefined,
    );
    projects["web"] = webProject;

    const apiProject = new sentry.SentryProject(
        `${projectName}-api-project`,
        {
            organization: config.sentry.org,
            teams: [team.slug],
            name: `${projectDisplayName} API`,
            slug: `${projectName}-api`,
            platform: "node",
        },
        provider ? { provider } : undefined,
    );
    projects["api"] = apiProject;

    const adminProject = new sentry.SentryProject(
        `${projectName}-admin-project`,
        {
            organization: config.sentry.org,
            teams: [team.slug],
            name: `${projectDisplayName} Admin`,
            slug: `${projectName}-admin`,
            platform: "javascript-react",
        },
        provider ? { provider } : undefined,
    );
    projects["admin"] = adminProject;

    const dsn = pulumi.interpolate`https://${config.sentry.authToken}@${config.sentry.org}.ingest.sentry.io/${webProject.id}`;

    return {
        team,
        projects,
        dsn,
    };
}

export interface ObservabilityOutputs {
    grafana: GrafanaOutputs;
    sentry: SentryOutputs;
}

export function createObservability(
    config: InfraConfig,
    grafanaProvider?: grafana.Provider,
    sentryProvider?: sentry.Provider,
): ObservabilityOutputs {
    return {
        grafana: createPortfolioGrafanaResources(config, grafanaProvider),
        sentry: createPortfolioSentryConfig(config, sentryProvider),
    };
}
