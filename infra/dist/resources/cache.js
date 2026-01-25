import * as pulumi from "@pulumi/pulumi";
import * as rediscloud from "@rediscloud/pulumi-rediscloud";
import { getProjectName } from "../config.js";
export function createPortfolioRedisConfig(secrets) {
    const projectName = getProjectName();
    const region = "ap-northeast-1";
    const subscription = new rediscloud.Subscription(`${projectName}-redis-subscription`, {
        name: `${projectName}-subscription`,
        cloudProvider: {
            provider: "AWS",
            regions: [
                {
                    region: region,
                    multipleAvailabilityZones: false,
                    preferredAvailabilityZones: [region],
                    networkingDeploymentCidr: "10.0.0.0/24",
                },
            ],
        },
        paymentMethod: "credit-card",
        memoryStorage: "ram",
        creationPlan: {
            memoryLimitInGb: 0.03,
            quantity: 1,
            replication: false,
            throughputMeasurementBy: "operations-per-second",
            throughputMeasurementValue: 1000,
        },
    });
    const database = new rediscloud.SubscriptionDatabase(`${projectName}-redis-db`, {
        subscriptionId: subscription.id,
        name: `${projectName}-cache`,
        protocol: "redis",
        memoryLimitInGb: 0.03,
        dataPersistence: "none",
        throughputMeasurementBy: "operations-per-second",
        throughputMeasurementValue: 1000,
        replication: false,
    });
    const connectionString = secrets?.REDIS_URL ?? pulumi.output("");
    return {
        subscription,
        database,
        connectionString,
    };
}
//# sourceMappingURL=cache.js.map