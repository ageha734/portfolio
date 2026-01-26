import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
import type { SecretsOutputs } from "./secrets.js";

export const TIDB_ALLOWED_REGIONS = ["ap-northeast-1"] as const;

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
}

function validateTiDBRegion(region: string): asserts region is TiDBAllowedRegion {
    if (!TIDB_ALLOWED_REGIONS.includes(region as TiDBAllowedRegion)) {
        throw new Error(`TiDB region "${region}" is not allowed. Allowed regions: ${TIDB_ALLOWED_REGIONS.join(", ")}`);
    }
}

export function createTiDBServerlessConfig(
    clusterConfig: TiDBServerlessConfig,
    secrets?: {
        databaseUrl?: pulumi.Output<string>;
    },
): TiDBOutputs {
    validateTiDBRegion(clusterConfig.region);

    if (secrets?.databaseUrl) {
        const host = secrets.databaseUrl.apply((url) => {
            if (!url || url.trim() === "") {
                return `gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`;
            }
            try {
                const urlObj = new URL(url.replace(/^mysql:\/\//, "http://"));
                return urlObj.hostname;
            } catch {
                return `gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`;
            }
        });

        return {
            clusterConfig,
            connectionString: secrets.databaseUrl,
            host,
        };
    }

    const host = pulumi.output(`gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`);
    const connectionString = pulumi.output("");

    return {
        clusterConfig,
        connectionString,
        host,
    };
}

export function createPortfolioTiDBConfig(secrets?: SecretsOutputs["secrets"]): TiDBOutputs {
    const config = new pulumi.Config();
    const projectName = getProjectName();
    const region = "ap-northeast-1";
    const databaseName = config.get("tidbDatabase") || projectName.split("-").pop() || "portfolio";

    return createTiDBServerlessConfig(
        {
            name: `${projectName}-db`,
            cloudProvider: "AWS",
            region: region,
            database: databaseName,
            spendingLimitMonthly: 0,
        },
        secrets
            ? {
                  databaseUrl: secrets.DATABASE_URL,
              }
            : undefined,
    );
}

export const TIDB_SERVERLESS_RECOMMENDATIONS = {
    tokyo: {
        cloudProvider: "AWS",
        region: "ap-northeast-1",
        tier: "Serverless",
        freeTierLimits: {
            rowStorageGiB: 5,
            requestUnitsPerMonth: 50_000_000,
        },
    },
    connection: {
        port: 4000,
        sslMode: "VERIFY_IDENTITY",
        pooling: {
            minConnections: 1,
            maxConnections: 10,
            idleTimeoutMs: 60000,
        },
    },
};
