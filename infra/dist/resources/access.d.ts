import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";
import type { InfraConfig } from "../config.js";
export interface AccessOutputs {
    applications: Record<string, cloudflare.ZeroTrustAccessApplication>;
}
export declare function createPreviewDeploymentAccess(config: InfraConfig, pagesProjects: {
    projects: Record<string, cloudflare.PagesProject>;
    subdomains: Record<string, pulumi.Output<string>>;
}, workers: {
    scripts: Record<string, cloudflare.WorkersScript>;
    subdomains: Record<string, pulumi.Output<string>>;
}, provider?: cloudflare.Provider): AccessOutputs | null;
//# sourceMappingURL=access.d.ts.map