import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
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
}
export interface PagesOutputs {
    projects: Record<string, cloudflare.PagesProject>;
    domains: Record<string, cloudflare.PagesDomain>;
    subdomains: Record<string, pulumi.Output<string>>;
}
export declare function createPagesProjects(config: InfraConfig, projects: PagesProjectConfig[], provider?: cloudflare.Provider): PagesOutputs;
export declare function createPortfolioPagesProjects(config: InfraConfig, _secrets: {
    databaseUrl: pulumi.Output<string>;
    redisUrl?: pulumi.Output<string>;
}, provider?: cloudflare.Provider): PagesOutputs;
//# sourceMappingURL=pages.d.ts.map