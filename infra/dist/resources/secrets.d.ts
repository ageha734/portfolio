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
    TIDB_HOST: string;
    GRAFANA_API_KEY: string;
    GRAFANA_ORG_SLUG: string;
    SENTRY_AUTH_TOKEN: string;
    SENTRY_ORG: string;
    SENTRY_DSN?: string;
    BETTER_AUTH_SECRET?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
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
}
/**
 * Dopplerプロジェクトと環境（rc, stg, prd）を作成する
 * @param projectName プロジェクト名（デフォルト: "portfolio"）
 * @param description プロジェクトの説明
 * @returns Dopplerプロジェクトと環境のリソース
 */
export declare function createDopplerProject(projectName?: string, description?: string): DopplerProjectOutputs;
//# sourceMappingURL=secrets.d.ts.map