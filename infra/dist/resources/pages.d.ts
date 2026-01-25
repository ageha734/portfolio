import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
export interface PagesProjectConfig {
    name: string;
    productionBranch: string;
    buildCommand?: string;
    destinationDir?: string;
    rootDir?: string;
    environmentVariables?: Record<string, string>;
    secrets?: Record<string, pulumi.Output<string>>;
    compatibilityDate?: string;
    customDomain?: string;
}
export interface PagesOutputs {
    projects: Record<string, cloudflare.PagesProject>;
    domains: Record<string, cloudflare.PagesDomain>;
}
export declare function createPagesProjects(config: InfraConfig, projects: PagesProjectConfig[]): PagesOutputs;
export declare function createPortfolioPagesProjects(config: InfraConfig, secrets: {
    databaseUrl: pulumi.Output<string>;
    redisUrl?: pulumi.Output<string>;
}): PagesOutputs;
//# sourceMappingURL=pages.d.ts.map