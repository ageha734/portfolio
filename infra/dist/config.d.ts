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
    REDISCLOUD_SUBSCRIPTION_ID: pulumi.Output<string>;
    REDISCLOUD_DATABASE_ID: pulumi.Output<string>;
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
    REDISCLOUD_ACCESS_KEY: pulumi.Output<string>;
    REDISCLOUD_SECRET_KEY: pulumi.Output<string>;
    TIDBCLOUD_PUBLIC_KEY: pulumi.Output<string>;
    TIDBCLOUD_PRIVATE_KEY: pulumi.Output<string>;
    API_BASE_URL: pulumi.Output<string>;
    APP_VERSION: pulumi.Output<string>;
    BETTER_AUTH_URL: pulumi.Output<string>;
    VITE_BASE_URL: pulumi.Output<string>;
    VITE_GOOGLE_ANALYTICS_ENABLED: pulumi.Output<string>;
    VITE_GOOGLE_TAG_MANAGER_ENABLED: pulumi.Output<string>;
    VITE_SENTRY_DSN: pulumi.Output<string>;
    VITE_SENTRY_ENVIRONMENT: pulumi.Output<string>;
    VITE_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE: pulumi.Output<string>;
    VITE_SENTRY_REPLAY_SAMPLE_RATE: pulumi.Output<string>;
    VITE_SENTRY_TRACES_SAMPLE_RATE: pulumi.Output<string>;
    VITE_XSTATE_INSPECTOR_ENABLED: pulumi.Output<string>;
};
export interface InfraConfig {
    environment: string;
    cloudflare: {
        apiToken: pulumi.Output<string>;
        accountId: pulumi.Output<string> | string;
        zoneId: pulumi.Output<string> | string;
        domain: string;
        protocol?: string;
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
export declare function getConfig(customSecrets?: ReturnType<typeof getDopplerSecrets>): InfraConfig;
export declare function getTags(resourceName: string): Record<string, string>;
//# sourceMappingURL=config.d.ts.map