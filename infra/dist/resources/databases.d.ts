import * as pulumi from "@pulumi/pulumi";
import { type TiDBCloudServerlessClusterOutputs } from "../provider/tidbcloud.js";
import type { SecretsOutputs } from "./secrets.js";
export declare const TIDB_ALLOWED_REGIONS: readonly ["ap-northeast-1"];
export type TiDBAllowedRegion = (typeof TIDB_ALLOWED_REGIONS)[number];
export interface TiDBServerlessConfig {
    name: string;
    cloudProvider: "AWS";
    region: TiDBAllowedRegion;
    database: string;
    spendingLimitMonthly?: number;
}
export interface TiDBOutputs {
    clusterConfig: TiDBServerlessConfig;
    connectionString: pulumi.Output<string>;
    host: pulumi.Output<string>;
    cluster?: TiDBCloudServerlessClusterOutputs;
}
export declare function createTiDBServerlessConfig(clusterConfig: TiDBServerlessConfig, secrets?: {
    databaseUrl?: pulumi.Output<string>;
}): TiDBOutputs;
export declare function createPortfolioTiDBConfig(secrets?: SecretsOutputs["secrets"], apiKeys?: {
    publicKey?: pulumi.Output<string>;
    privateKey?: pulumi.Output<string>;
}): TiDBOutputs;
export declare const TIDB_SERVERLESS_RECOMMENDATIONS: {
    tokyo: {
        cloudProvider: string;
        region: string;
        tier: string;
        freeTierLimits: {
            rowStorageGiB: number;
            requestUnitsPerMonth: number;
        };
    };
    connection: {
        port: number;
        sslMode: string;
        pooling: {
            minConnections: number;
            maxConnections: number;
            idleTimeoutMs: number;
        };
    };
};
//# sourceMappingURL=databases.d.ts.map