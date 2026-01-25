import * as pulumi from "@pulumi/pulumi";
export interface DopplerSettings {
    project: string;
    config: string;
}
export declare function getDopplerSettings(): DopplerSettings;
export declare function getProjectName(): string;
export declare function getDopplerSecrets(): {
    DATABASE_URL: pulumi.Output<string>;
    REDIS_URL: pulumi.Output<string>;
    TIDB_HOST: pulumi.Output<string>;
    CLOUDFLARE_API_TOKEN: pulumi.Output<string>;
    CLOUDFLARE_ACCOUNT_ID: pulumi.Output<string>;
    CLOUDFLARE_ZONE_ID: pulumi.Output<string>;
    GRAFANA_API_KEY: pulumi.Output<string>;
    GRAFANA_ORG_SLUG: pulumi.Output<string>;
    SENTRY_AUTH_TOKEN: pulumi.Output<string>;
    SENTRY_ORG: pulumi.Output<string>;
    SENTRY_DSN: pulumi.Output<string>;
    BETTER_AUTH_SECRET: pulumi.Output<string>;
    GOOGLE_CLIENT_ID: pulumi.Output<string>;
    GOOGLE_CLIENT_SECRET: pulumi.Output<string>;
};
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
export declare function getConfig(): InfraConfig;
export declare function getTags(resourceName: string): Record<string, string>;
//# sourceMappingURL=config.d.ts.map