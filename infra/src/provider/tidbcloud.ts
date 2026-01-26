import * as crypto from "node:crypto";
import * as http from "node:http";
import * as https from "node:https";
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

class TiDBCloudApiClient {
    private readonly publicKey: string;
    private readonly privateKey: string;
    private readonly baseUrl = "https://api.tidbcloud.com";

    constructor(publicKey: string, privateKey: string) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    private createRequestOptions(method: string, path: string, authHeader?: string): https.RequestOptions {
        const url = new URL(path, this.baseUrl);
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (authHeader) {
            headers.Authorization = authHeader;
        }

        return {
            method,
            hostname: url.hostname,
            path: url.pathname + url.search,
            headers,
        };
    }

    private parseResponse(data: string): unknown {
        try {
            return data ? JSON.parse(data) : {};
        } catch (error) {
            throw new Error(`Failed to parse response: ${error}`);
        }
    }

    private handleResponse(
        res: http.IncomingMessage,
        method: string,
        path: string,
        resolve: (value: { statusCode: number; headers: http.IncomingHttpHeaders; data: unknown }) => void,
        reject: (reason?: unknown) => void,
        retryWithAuth: (authHeader: string) => void,
    ): void {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });
        res.on("end", () => {
            if (res.statusCode === 401 && !res.headers.authorization) {
                const wwwAuth = res.headers["www-authenticate"];
                if (wwwAuth && typeof wwwAuth === "string") {
                    const digestAuth = this.generateDigestAuth(method, path, wwwAuth);
                    retryWithAuth(digestAuth);
                    return;
                }
            }

            try {
                const parsed = this.parseResponse(data);
                resolve({
                    statusCode: res.statusCode ?? 500,
                    headers: res.headers,
                    data: parsed,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    private async request(
        method: string,
        path: string,
        body?: unknown,
    ): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; data: unknown }> {
        return new Promise((resolve, reject) => {
            const url = new URL(path, this.baseUrl);
            const makeRequest = (authHeader?: string) => {
                const options = this.createRequestOptions(method, path, authHeader);

                const req = https.request(options, (res) => {
                    this.handleResponse(res, method, url.pathname, resolve, reject, makeRequest);
                });

                req.on("error", reject);

                if (body) {
                    req.write(JSON.stringify(body));
                }

                req.end();
            };

            makeRequest();
        });
    }

    private parseDigestAuthParams(wwwAuth: string): Record<string, string> {
        const params: Record<string, string> = {};
        const regex = /(\w+)="?([^",\s]+)"?/g;
        let match: RegExpExecArray | null = regex.exec(wwwAuth);

        while (match !== null) {
            const [, key, value] = match;
            if (key && value) {
                params[key] = value;
            }
            match = regex.exec(wwwAuth);
        }

        return params;
    }

    private generateDigestAuth(method: string, path: string, wwwAuth: string): string {
        const params = this.parseDigestAuthParams(wwwAuth);
        const realm = params.realm ?? "";
        const nonce = params.nonce ?? "";
        const qop = params.qop ?? "";

        const ha1 = crypto.createHash("md5").update(`${this.publicKey}:${realm}:${this.privateKey}`).digest("hex");
        const ha2 = crypto.createHash("md5").update(`${method}:${path}`).digest("hex");
        const cnonce = crypto.randomBytes(8).toString("hex");
        const nc = "00000001";
        const response = crypto.createHash("md5").update(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`).digest("hex");

        return `Digest username="${this.publicKey}", realm="${realm}", nonce="${nonce}", uri="${path}", qop=${qop}, nc=${nc}, cnonce="${cnonce}", response="${response}"`;
    }

    async createServerlessCluster(
        inputs: TiDBCloudServerlessClusterInputs,
    ): Promise<TiDBCloudServerlessClusterOutputs> {
        const path = inputs.projectId ? `/api/v1beta1/projects/${inputs.projectId}/clusters` : "/api/v1beta1/clusters";

        const body = {
            display_name: inputs.displayName,
            cloud_provider: "AWS",
            region: inputs.region,
            cluster_type: "SERVERLESS",
            config: {
                spending_limit_monthly: inputs.spendingLimitMonthly ?? 0,
            },
        };

        const response = await this.request("POST", path, body);

        if (response.statusCode < 200 || response.statusCode >= 300) {
            throw new Error(`Failed to create TiDB cluster: ${response.statusCode} ${JSON.stringify(response.data)}`);
        }

        const cluster = response.data as {
            id: string;
            display_name: string;
            region: string;
            status: string;
            connection_strings?: {
                default_user?: string;
                standard?: string;
            };
        };

        return {
            id: cluster.id,
            displayName: cluster.display_name,
            region: cluster.region,
            status: cluster.status,
            connectionString: cluster.connection_strings?.standard,
            host: cluster.connection_strings?.standard
                ? new URL(cluster.connection_strings.standard.replace(/^mysql:\/\//, "http://")).hostname
                : undefined,
        };
    }

    async getServerlessCluster(clusterId: string, projectId?: string): Promise<TiDBCloudServerlessClusterOutputs> {
        console.log(`[DEBUG_TRACE] >>> STATE: Getting cluster: id=${clusterId}, projectId=${projectId ?? "none"}`);

        const path = projectId
            ? `/api/v1beta1/projects/${projectId}/clusters/${clusterId}`
            : `/api/v1beta1/clusters/${clusterId}`;

        const response = await this.request("GET", path);

        console.log(`[DEBUG_TRACE] >>> STATE: Response status: ${response.statusCode}`);

        if (response.statusCode === 404) {
            throw new Error(`TiDB cluster not found: ${clusterId}`);
        }

        if (response.statusCode < 200 || response.statusCode >= 300) {
            const errorMessage = `Failed to get TiDB cluster: ${response.statusCode} ${JSON.stringify(response.data)}`;
            console.error(`[DEBUG_TRACE] >>> ERROR: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const cluster = response.data as {
            id: string;
            display_name: string;
            region: string;
            status: string;
            connection_strings?: {
                default_user?: string;
                standard?: string;
            };
        };

        console.log(`[DEBUG_TRACE] >>> STATE: Cluster retrieved: status=${cluster.status}`);

        return {
            id: cluster.id,
            displayName: cluster.display_name,
            region: cluster.region,
            status: cluster.status,
            connectionString: cluster.connection_strings?.standard,
            host: cluster.connection_strings?.standard
                ? new URL(cluster.connection_strings.standard.replace(/^mysql:\/\//, "http://")).hostname
                : undefined,
        };
    }

    async deleteServerlessCluster(clusterId: string, projectId?: string): Promise<void> {
        const path = projectId
            ? `/api/v1beta1/projects/${projectId}/clusters/${clusterId}`
            : `/api/v1beta1/clusters/${clusterId}`;

        const response = await this.request("DELETE", path);

        if (response.statusCode < 200 || (response.statusCode >= 300 && response.statusCode !== 404)) {
            throw new Error(`Failed to delete TiDB cluster: ${response.statusCode} ${JSON.stringify(response.data)}`);
        }
    }
}

class TiDBCloudServerlessClusterProvider implements pulumi.dynamic.ResourceProvider {
    async create(inputs: {
        displayName: string;
        region: string;
        spendingLimitMonthly?: number;
        projectId?: string;
        publicKey: string;
        privateKey: string;
    }): Promise<pulumi.dynamic.CreateResult> {
        console.log(
            `[DEBUG_TRACE] >>> ENTRY: createTiDBCluster(displayName=${inputs.displayName}, region=${inputs.region})`,
        );

        const client = new TiDBCloudApiClient(inputs.publicKey, inputs.privateKey);

        try {
            const cluster = await client.createServerlessCluster({
                displayName: inputs.displayName,
                region: inputs.region,
                spendingLimitMonthly: inputs.spendingLimitMonthly,
                projectId: inputs.projectId,
            });

            console.log(
                `[DEBUG_TRACE] >>> EXIT: createTiDBCluster returned id=${cluster.id}, status=${cluster.status}`,
            );

            return {
                id: cluster.id,
                outs: {
                    id: cluster.id,
                    displayName: cluster.displayName,
                    region: cluster.region,
                    status: cluster.status,
                    connectionString: cluster.connectionString ?? "",
                    host: cluster.host ?? "",
                },
            };
        } catch (error) {
            console.error(`[DEBUG_TRACE] >>> ERROR: createTiDBCluster failed: ${error}`);
            throw error;
        }
    }

    async read(
        id: string,
        inputs: {
            displayName: string;
            region: string;
            spendingLimitMonthly?: number;
            projectId?: string;
            publicKey: string;
            privateKey: string;
        },
    ): Promise<pulumi.dynamic.ReadResult> {
        console.log(`[DEBUG_TRACE] >>> ENTRY: readTiDBCluster(id=${id})`);

        const client = new TiDBCloudApiClient(inputs.publicKey, inputs.privateKey);

        try {
            const cluster = await client.getServerlessCluster(id, inputs.projectId);

            console.log(`[DEBUG_TRACE] >>> EXIT: readTiDBCluster returned status=${cluster.status}`);

            return {
                id: cluster.id,
                props: {
                    id: cluster.id,
                    displayName: cluster.displayName,
                    region: cluster.region,
                    status: cluster.status,
                    connectionString: cluster.connectionString ?? "",
                    host: cluster.host ?? "",
                },
            };
        } catch (error) {
            console.error(`[DEBUG_TRACE] >>> ERROR: readTiDBCluster failed: ${error}`);
            return { id: "", props: {} };
        }
    }

    async update(
        id: string,
        _olds: {
            displayName: string;
            region: string;
            spendingLimitMonthly?: number;
            projectId?: string;
            publicKey: string;
            privateKey: string;
        },
        news: {
            displayName: string;
            region: string;
            spendingLimitMonthly?: number;
            projectId?: string;
            publicKey: string;
            privateKey: string;
        },
    ): Promise<pulumi.dynamic.UpdateResult> {
        console.log(`[DEBUG_TRACE] >>> ENTRY: updateTiDBCluster(id=${id})`);

        const client = new TiDBCloudApiClient(news.publicKey, news.privateKey);

        try {
            const cluster = await client.getServerlessCluster(id, news.projectId);

            console.log(`[DEBUG_TRACE] >>> EXIT: updateTiDBCluster returned status=${cluster.status}`);

            return {
                outs: {
                    id: cluster.id,
                    displayName: cluster.displayName,
                    region: cluster.region,
                    status: cluster.status,
                    connectionString: cluster.connectionString ?? "",
                    host: cluster.host ?? "",
                },
            };
        } catch (error) {
            console.error(`[DEBUG_TRACE] >>> ERROR: updateTiDBCluster failed: ${error}`);
            throw error;
        }
    }

    async delete(
        id: string,
        inputs: {
            displayName: string;
            region: string;
            spendingLimitMonthly?: number;
            projectId?: string;
            publicKey: string;
            privateKey: string;
        },
    ): Promise<void> {
        console.log(`[DEBUG_TRACE] >>> ENTRY: deleteTiDBCluster(id=${id})`);

        const client = new TiDBCloudApiClient(inputs.publicKey, inputs.privateKey);

        try {
            await client.deleteServerlessCluster(id, inputs.projectId);
            console.log("[DEBUG_TRACE] >>> EXIT: deleteTiDBCluster completed");
        } catch (error) {
            console.error(`[DEBUG_TRACE] >>> ERROR: deleteTiDBCluster failed: ${error}`);
            throw error;
        }
    }
}

export class TiDBCloudServerlessCluster extends pulumi.dynamic.Resource {
    public readonly displayName!: pulumi.Output<string>;
    public readonly region!: pulumi.Output<string>;
    public readonly status!: pulumi.Output<string>;
    public readonly connectionString!: pulumi.Output<string>;
    public readonly host!: pulumi.Output<string>;

    constructor(
        name: string,
        args: {
            displayName: pulumi.Input<string>;
            region: pulumi.Input<string>;
            spendingLimitMonthly?: pulumi.Input<number>;
            projectId?: pulumi.Input<string>;
            publicKey: pulumi.Input<string>;
            privateKey: pulumi.Input<string>;
        },
        opts?: pulumi.CustomResourceOptions,
    ) {
        super(
            new TiDBCloudServerlessClusterProvider(),
            name,
            {
                id: undefined,
                displayName: args.displayName,
                region: args.region,
                spendingLimitMonthly: args.spendingLimitMonthly,
                projectId: args.projectId,
                publicKey: args.publicKey,
                privateKey: args.privateKey,
                connectionString: undefined,
                host: undefined,
                status: undefined,
            },
            opts,
        );
    }
}
