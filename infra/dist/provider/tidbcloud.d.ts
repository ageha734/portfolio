import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";
export interface TiDBCloudServerlessClusterOutputs {
    createCommand: command.local.Command;
    clusterId: pulumi.Output<string>;
    connectionString: pulumi.Output<string>;
    host: pulumi.Output<string>;
    status: pulumi.Output<string>;
}
/**
 * TiDB Cloud Serverless クラスターを curl + Digest認証で作成
 */
export declare function createTiDBCloudServerlessCluster(name: string, args: {
    displayName: string;
    region: string;
    spendingLimitMonthly?: number;
    publicKey: pulumi.Input<string>;
    privateKey: pulumi.Input<string>;
}, opts?: pulumi.CustomResourceOptions): TiDBCloudServerlessClusterOutputs;
//# sourceMappingURL=tidbcloud.d.ts.map