import * as cloudflare from "@pulumi/cloudflare";
import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
export interface ServiceBindingConfig {
    service: pulumi.Input<string>;
    entrypoint?: string;
    environment?: string;
}
export type ServiceBindingConfigOutput = pulumi.Output<ServiceBindingConfig | undefined>;
export interface PagesProjectConfig {
    name: pulumi.Input<string>;
    productionBranch: string;
    buildCommand?: string;
    destinationDir?: string;
    rootDir?: string;
    environmentVariables?: Record<string, string>;
    secrets?: Record<string, pulumi.Output<string>>;
    compatibilityDate?: string;
    customDomain?: string;
    serviceBinding?: ServiceBindingConfig | ServiceBindingConfigOutput;
}
export interface PagesOutputs {
    projects: Record<string, cloudflare.PagesProject>;
    domains: Record<string, cloudflare.PagesDomain>;
    subdomains: Record<string, pulumi.Output<string>>;
    serviceBindingCommands?: Record<string, command.local.Command>;
}
export declare function createPagesProjects(config: InfraConfig, projects: PagesProjectConfig[], provider?: cloudflare.Provider): PagesOutputs;
export declare function createPortfolioPagesProjects(config: InfraConfig, _secrets: {
    databaseUrl: pulumi.Output<string>;
    redisUrl?: pulumi.Output<string>;
}, provider?: cloudflare.Provider, apiWorkerScriptName?: pulumi.Output<string>): PagesOutputs;
//# sourceMappingURL=pages.d.ts.map