import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import type { InfraConfig } from "../config.js";
export interface WorkerConfig {
    name: string;
    scriptPath?: string;
    scriptContent?: string;
    compatibilityDate?: string;
    compatibilityFlags?: string[];
    bindings?: {
        vars?: Record<string, string>;
        secrets?: Record<string, pulumi.Output<string>>;
        kvNamespaces?: Array<{
            name: string;
            namespaceId: string;
        }>;
        r2Buckets?: Array<{
            name: string;
            bucketName: string;
        }>;
        d1Databases?: Array<{
            name: string;
            databaseId: string;
        }>;
    };
    routes?: Array<{
        pattern: string;
        zoneId?: string;
    }>;
    customDomain?: string;
}
export interface WorkersOutputs {
    scripts: Record<string, cloudflare.WorkersScript>;
    routes: Record<string, cloudflare.WorkersRoute>;
    domains: Record<string, cloudflare.WorkersDomain>;
}
export declare function createWorkers(config: InfraConfig, workers: WorkerConfig[]): WorkersOutputs;
export declare function createPortfolioApiWorker(config: InfraConfig, secrets: {
    databaseUrl: pulumi.Output<string>;
    redisUrl?: pulumi.Output<string>;
}): WorkersOutputs;
//# sourceMappingURL=workers.d.ts.map