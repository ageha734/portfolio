import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";
/**
 * TiDB Cloud Serverless クラスターを curl + Digest認証で作成
 */
export function createTiDBCloudServerlessCluster(name, args, opts) {
    // TiDB Serverless API v1beta1 endpoint
    const baseUrl = "https://serverless.tidbapi.com";
    // クラスター作成コマンド
    const createClusterCommand = new command.local.Command(`${name}-create`, {
        create: pulumi
            .all([args.publicKey, args.privateKey])
            .apply(([publicKey, privateKey]) => {
            // TiDB Serverless API v1beta1 format
            const payload = JSON.stringify({
                displayName: args.displayName,
                region: {
                    name: `regions/aws-${args.region}`,
                },
                spendingLimit: {
                    monthly: args.spendingLimitMonthly ?? 0,
                },
            });
            return `curl -s --digest -u "${publicKey}:${privateKey}" \\
                        -X POST "${baseUrl}/v1beta1/clusters" \\
                        -H "Content-Type: application/json" \\
                        -d '${payload}'`;
        }),
    }, opts);
    // レスポンスからクラスター情報を抽出 (TiDB Serverless API v1beta1 format)
    const clusterId = createClusterCommand.stdout.apply((stdout) => {
        try {
            const response = JSON.parse(stdout);
            // v1beta1 format: clusterId
            return response.clusterId ?? "";
        }
        catch {
            pulumi.log.warn(`[DEBUG_TRACE] >>> Failed to parse TiDB response for clusterId: ${stdout}`);
            return "";
        }
    });
    const host = createClusterCommand.stdout.apply((stdout) => {
        try {
            const response = JSON.parse(stdout);
            // v1beta1 format: endpoints.public.host
            const publicHost = response.endpoints?.public?.host;
            if (publicHost) {
                return publicHost;
            }
            return `gateway01.${args.region}.prod.aws.tidbcloud.com`;
        }
        catch {
            pulumi.log.warn(`[DEBUG_TRACE] >>> Failed to parse TiDB response for host: ${stdout}`);
            return `gateway01.${args.region}.prod.aws.tidbcloud.com`;
        }
    });
    const connectionString = pulumi
        .all([createClusterCommand.stdout, host])
        .apply(([stdout, hostValue]) => {
        try {
            const response = JSON.parse(stdout);
            // v1beta1 format: userPrefix for constructing connection string
            const userPrefix = response.userPrefix;
            const port = response.endpoints?.public?.port ?? 4000;
            if (userPrefix && hostValue) {
                // MySQL connection string format for TiDB Serverless
                return `mysql://${userPrefix}:<password>@${hostValue}:${port}/?ssl-mode=VERIFY_IDENTITY`;
            }
            return "";
        }
        catch {
            pulumi.log.warn(`[DEBUG_TRACE] >>> Failed to parse TiDB response for connectionString: ${stdout}`);
            return "";
        }
    });
    const status = createClusterCommand.stdout.apply((stdout) => {
        try {
            const response = JSON.parse(stdout);
            // v1beta1 format: state (CREATING, ACTIVE, etc.)
            return response.state ?? "UNKNOWN";
        }
        catch {
            pulumi.log.warn(`[DEBUG_TRACE] >>> Failed to parse TiDB response for status: ${stdout}`);
            return "UNKNOWN";
        }
    });
    return {
        createCommand: createClusterCommand,
        clusterId,
        connectionString,
        host,
        status,
    };
}
//# sourceMappingURL=tidbcloud.js.map