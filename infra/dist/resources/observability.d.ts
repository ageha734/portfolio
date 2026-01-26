import * as pulumi from "@pulumi/pulumi";
import * as grafana from "@pulumiverse/grafana";
import * as sentry from "@pulumiverse/sentry";
import type { InfraConfig } from "../config.js";
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
export declare function createGrafanaResources(_config: InfraConfig, _stackConfig: GrafanaStackConfig, dashboards?: GrafanaDashboardConfig[], provider?: grafana.Provider): GrafanaOutputs;
export declare function createPortfolioGrafanaResources(config: InfraConfig, provider?: grafana.Provider): GrafanaOutputs;
export interface SentryOutputs {
    team: sentry.SentryTeam;
    projects: Record<string, sentry.SentryProject>;
    dsn: pulumi.Output<string>;
}
export declare function createPortfolioSentryConfig(config: InfraConfig, provider?: sentry.Provider): SentryOutputs;
export interface ObservabilityOutputs {
    grafana: GrafanaOutputs;
    sentry: SentryOutputs;
}
export declare function createObservability(config: InfraConfig, grafanaProvider?: grafana.Provider, sentryProvider?: sentry.Provider): ObservabilityOutputs;
//# sourceMappingURL=observability.d.ts.map