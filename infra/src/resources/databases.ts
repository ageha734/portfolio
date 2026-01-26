import * as pulumi from "@pulumi/pulumi";
import { getProjectName } from "../config.js";
import { TiDBCloudServerlessCluster } from "../provider/tidbcloud.js";
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
    cluster?: TiDBCloudServerlessCluster;
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

export function createPortfolioTiDBConfig(
    secrets?: SecretsOutputs["secrets"],
    apiKeys?: {
        publicKey?: pulumi.Output<string>;
        privateKey?: pulumi.Output<string>;
    },
): TiDBOutputs {
    const config = new pulumi.Config();
    const projectName = getProjectName();
    const region = "ap-northeast-1";
    const databaseName = config.get("tidbDatabase") || projectName.split("-").pop() || "portfolio";
    const shouldCreateCluster = config.getBoolean("createTiDBCluster") ?? false;

    const clusterConfig: TiDBServerlessConfig = {
        name: `${projectName}-db`,
        cloudProvider: "AWS",
        region: region,
        database: databaseName,
        spendingLimitMonthly: 0,
    };

    let cluster: TiDBCloudServerlessCluster | undefined;
    let connectionString: pulumi.Output<string>;
    let host: pulumi.Output<string>;

    if (shouldCreateCluster && apiKeys?.publicKey && apiKeys?.privateKey) {
        pulumi.log.info(
            `[DEBUG_TRACE] >>> ENTRY: createTiDBCluster(displayName=${clusterConfig.name}, region=${region})`,
        );

        cluster = new TiDBCloudServerlessCluster(
            "tidb-cluster",
            {
                displayName: clusterConfig.name,
                region: clusterConfig.region,
                spendingLimitMonthly: clusterConfig.spendingLimitMonthly,
                publicKey: apiKeys.publicKey,
                privateKey: apiKeys.privateKey,
            },
            {
                protect: false,
            },
        );

        connectionString = cluster.connectionString;
        host = cluster.host;

        pulumi.log.info(
            "[DEBUG_TRACE] >>> TiDBクラスターを自動作成します。" +
                `クラスター名: ${clusterConfig.name}, リージョン: ${clusterConfig.region}`,
        );
    } else {
        if (!secrets?.DATABASE_URL) {
            pulumi.log.warn(
                "[DEBUG_TRACE] >>> TiDBクラスターが設定されていません。" +
                    "TiDB Cloudダッシュボードでクラスターを作成し、DATABASE_URLをDopplerに設定してください。" +
                    "または、createTiDBCluster=true を設定し、TIDBCLOUD_PUBLIC_KEY と TIDBCLOUD_PRIVATE_KEY をDopplerに設定してください。" +
                    "詳細は infra/scripts/TIDB_CLOUD_MANUAL_SETUP.md を参照してください。" +
                    `クラスター名: ${clusterConfig.name}, リージョン: ${clusterConfig.region}, データベース名: ${clusterConfig.database}`,
            );
        } else {
            secrets.DATABASE_URL.apply((url) => {
                if (!url || url.trim() === "") {
                    pulumi.log.warn(
                        "[DEBUG_TRACE] >>> DATABASE_URLが空です。" +
                            "TiDB Cloudダッシュボードでクラスターを作成し、DATABASE_URLをDopplerに設定してください。" +
                            "詳細は infra/scripts/TIDB_CLOUD_MANUAL_SETUP.md を参照してください。",
                    );
                } else {
                    pulumi.log.info(
                        "[DEBUG_TRACE] >>> TiDBクラスター接続情報が設定されています。" +
                            `クラスター名: ${clusterConfig.name}, リージョン: ${clusterConfig.region}, データベース名: ${clusterConfig.database}`,
                    );
                }
                return url;
            });
        }

        const configResult = createTiDBServerlessConfig(
            clusterConfig,
            secrets ? { databaseUrl: secrets.DATABASE_URL } : undefined,
        );
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
