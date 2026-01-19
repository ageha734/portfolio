import { Counter, Gauge, Histogram } from "prom-client";
import { PrometheusClient } from "./client";
export declare class CommonMetrics {
    readonly httpRequestDuration: Histogram<string>;
    readonly httpRequestTotal: Counter<string>;
    readonly httpRequestErrors: Counter<string>;
    readonly errorsTotal: Counter<string>;
    readonly errorsByCode: Counter<string>;
    readonly dbQueryDuration: Histogram<string>;
    readonly dbQueryTotal: Counter<string>;
    readonly dbConnections: Gauge<string>;
    readonly cacheHits: Counter<string>;
    readonly cacheMisses: Counter<string>;
    readonly cacheOperations: Counter<string>;
    constructor(client: PrometheusClient);
}
//# sourceMappingURL=metrics.d.ts.map