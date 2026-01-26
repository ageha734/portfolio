import * as pulumi from "@pulumi/pulumi";
export declare const dopplerProjectId: pulumi.Output<string> | undefined;
export declare const dopplerEnvironmentIds: pulumi.Output<pulumi.UnwrappedObject<{
    [k: string]: pulumi.Output<string>;
}>> | undefined;
export declare const tidbConnectionString: pulumi.Output<string>;
export declare const tidbHost: pulumi.Output<string>;
export declare const redisConnectionString: pulumi.Output<string>;
export declare const tidbClusterInfo: {
    name: string;
    cloudProvider: "AWS";
    region: "ap-northeast-1";
    database: string;
    tier: string;
    allowedRegions: readonly ["ap-northeast-1"];
    recommendations: {
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
};
export declare const pagesProjectNames: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const pagesDomainNames: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const dnsRecordIds: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const accessApplicationIds: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}> | undefined;
export declare const workerScriptNames: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const workerDomainNames: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const grafanaFolderUids: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const grafanaDashboardUids: pulumi.Output<{
    [k: string]: pulumi.Output<string>;
}>;
export declare const sentryDsn: pulumi.Output<string>;
export declare const sentryTeamSlug: pulumi.Output<string>;
export declare const sentryProjectSlugs: {
    [k: string]: pulumi.Output<string>;
};
export declare const dopplerInfo: {
    commands: {
        downloadEnv: string;
        runDev: string;
        runWithProject: string;
    };
};
export declare const cloudflareEnvVars: Record<string, pulumi.Output<string>>;
export declare const summary: {
    environment: string;
    domain: string;
    secretsManagement: string;
    databases: {
        tidb: {
            type: string;
            cloudProvider: string;
            region: string;
        };
        redis: {
            name: pulumi.Output<string>;
            subscription: pulumi.Output<string>;
        } | {
            name: string;
            subscription: string;
        };
    };
    cloudflare: {
        accountId: string | pulumi.Output<string>;
    };
};
//# sourceMappingURL=index.d.ts.map