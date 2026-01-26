import * as pulumi from "@pulumi/pulumi";
import * as rediscloud from "@rediscloud/pulumi-rediscloud";
import type { SecretsOutputs } from "./secrets.js";
export interface RedisOutputs {
    subscription?: rediscloud.Subscription;
    database?: rediscloud.SubscriptionDatabase;
    connectionString: pulumi.Output<string>;
}
export declare function createPortfolioRedisConfig(secrets?: SecretsOutputs["secrets"], provider?: rediscloud.Provider): RedisOutputs;
//# sourceMappingURL=cache.d.ts.map