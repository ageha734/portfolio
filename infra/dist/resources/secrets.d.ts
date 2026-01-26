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
    GRAFANA_API_KEY: string;
    GRAFANA_ORG_SLUG: string;
    SENTRY_AUTH_TOKEN: string;
    SENTRY_ORG: string;
    SENTRY_DSN?: string;
    REDISCLOUD_ACCESS_KEY: string;
    REDISCLOUD_SECRET_KEY: string;
    REDISCLOUD_SUBSCRIPTION_ID?: string;
    REDISCLOUD_DATABASE_ID?: string;
    BETTER_AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    TIDBCLOUD_PUBLIC_KEY?: string;
    TIDBCLOUD_PRIVATE_KEY?: string;
}
export interface SecretsOutputs {
    secrets: Record<keyof SecretKeys, pulumi.Output<string>>;
    syncedSecrets: Record<string, doppler.Secret>;
}
export declare function getDopplerSecrets(dopplerConfig: DopplerConfig): SecretsOutputs;
export declare function getDopplerSecret(project: string, config: string, secretName: string): pulumi.Output<string>;
export declare function getCloudflareEnvVars(secrets: SecretsOutputs["secrets"]): Record<string, pulumi.Output<string>>;
export declare const DOPPLER_CLI_COMMANDS: {
    downloadEnv: string;
    runDev: string;
    runWithConfig: (project: string, config: string, command: string) => string;
};
export declare function createPortfolioDopplerConfig(environment: "rc" | "stg" | "prd"): DopplerConfig;
export declare function getDopplerProjectStructure(): {
    project: string;
    configs: {
        rc: string;
        stg: string;
        prd: string;
    };
    secrets: {
        name: string;
        description: string;
    }[];
};
export declare const DOPPLER_PROJECT_STRUCTURE: {
    project: string;
    configs: {
        rc: string;
        stg: string;
        prd: string;
    };
    secrets: {
        name: string;
        description: string;
    }[];
};
export interface DopplerProjectOutputs {
    project: doppler.Project;
    environments: Record<string, doppler.Environment>;
    secrets?: Record<string, doppler.Secret>;
}
export declare function getSecretsFromCreatedResources(dopplerProjectResources: DopplerProjectOutputs | {
    secrets?: Record<string, doppler.Secret>;
}, configName: string): Record<string, pulumi.Output<string>>;
export declare function parseEnvFile(envFilePath?: string): Record<string, string>;
export declare function extractSecretsFromEnv(envVars: Record<string, string>, requiredKeys: string[]): Record<string, string>;
export declare function createDopplerSecrets(projectName: pulumi.Input<string>, configName: string, secrets: Record<string, string>): Record<string, doppler.Secret>;
export declare function createDopplerSecretsOnly(projectName?: string, envFilePath?: string): Record<string, doppler.Secret>;
export declare function createDopplerProject(projectName?: string, description?: string, envFilePath?: string): DopplerProjectOutputs;
//# sourceMappingURL=secrets.d.ts.map