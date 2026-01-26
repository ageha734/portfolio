import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
import { createTiDBCloudServerlessCluster } from "../provider/tidbcloud.js";
export const TIDB_ALLOWED_REGIONS = ["ap-northeast-1"];
function validateTiDBRegion(region) {
    if (!TIDB_ALLOWED_REGIONS.includes(region)) {
        throw new Error(`TiDB region "${region}" is not allowed. Allowed regions: ${TIDB_ALLOWED_REGIONS.join(", ")}`);
    }
}
export function createTiDBServerlessConfig(clusterConfig, secrets) {
    validateTiDBRegion(clusterConfig.region);
    if (secrets?.databaseUrl) {
        const host = secrets.databaseUrl.apply((url) => {
            if (!url || url.trim() === "") {
                return `gateway01.${clusterConfig.region}.prod.aws.tidbcloud.com`;
            }
            try {
                const urlObj = new URL(url.replace(/^mysql:\/\//, "http://"));
                return urlObj.hostname;
            }
            catch {
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
export function createPortfolioTiDBConfig(secrets, apiKeys) {
    const config = new pulumi.Config();
    const projectName = getProjectName();
    const region = "ap-northeast-1";
    const databaseName = config.get("tidbDatabase") || projectName.split("-").pop() || "portfolio";
    const shouldCreateCluster = config.getBoolean("createTiDBCluster") ?? false;
    const clusterConfig = {
        name: `${projectName}-db`,
        cloudProvider: "AWS",
        region: region,
        database: databaseName,
        spendingLimitMonthly: 0,
    };
    let cluster;
    let connectionString;
    let host;
    if (shouldCreateCluster && apiKeys?.publicKey && apiKeys?.privateKey) {
        cluster = createTiDBCloudServerlessCluster("tidb-cluster", {
            displayName: clusterConfig.name,
            region: clusterConfig.region,
            spendingLimitMonthly: clusterConfig.spendingLimitMonthly,
            publicKey: apiKeys.publicKey,
            privateKey: apiKeys.privateKey,
        }, {
            protect: false,
        });
        connectionString = cluster.connectionString;
        host = cluster.host;
    }
    else {
        const configResult = createTiDBServerlessConfig(clusterConfig, secrets ? { databaseUrl: secrets.DATABASE_URL } : undefined);
        connectionString = configResult.connectionString;
        host = configResult.host;
    }
    return {
        clusterConfig,
        connectionString,
        host,
        cluster,
    };
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
//# sourceMappingURL=databases.js.map