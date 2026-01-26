import * as pulumi from "@pulumi/pulumi";
export interface TiDBCloudApiKey {
    publicKey: string;
    privateKey: string;
}
export interface TiDBCloudServerlessClusterInputs {
    displayName: string;
    region: string;
    spendingLimitMonthly?: number;
    projectId?: string;
}
export interface TiDBCloudServerlessClusterOutputs {
    id: string;
    displayName: string;
    region: string;
    status: string;
    connectionString?: string;
    host?: string;
}
export declare class TiDBCloudServerlessCluster extends pulumi.dynamic.Resource {
    readonly displayName: pulumi.Output<string>;
    readonly region: pulumi.Output<string>;
    readonly status: pulumi.Output<string>;
    readonly connectionString: pulumi.Output<string>;
    readonly host: pulumi.Output<string>;
    constructor(name: string, args: {
        displayName: pulumi.Input<string>;
        region: pulumi.Input<string>;
        spendingLimitMonthly?: pulumi.Input<number>;
        projectId?: pulumi.Input<string>;
        publicKey: pulumi.Input<string>;
        privateKey: pulumi.Input<string>;
    }, opts?: pulumi.CustomResourceOptions);
}
//# sourceMappingURL=tidbcloud.d.ts.map