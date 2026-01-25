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
export declare function createGrafanaResources(config: InfraConfig, stackConfig: GrafanaStackConfig, dashboards?: GrafanaDashboardConfig[]): GrafanaOutputs;
export declare function createPortfolioGrafanaResources(config: InfraConfig): GrafanaOutputs;
export interface SentryOutputs {
    team: sentry.SentryTeam;
    projects: Record<string, sentry.SentryProject>;
    dsn: pulumi.Output<string>;
}
export declare function createPortfolioSentryConfig(config: InfraConfig): SentryOutputs;
export interface ObservabilityOutputs {
    grafana: GrafanaOutputs;
    sentry: SentryOutputs;
}
export declare function createObservability(config: InfraConfig): ObservabilityOutputs;
//# sourceMappingURL=observability.d.ts.map