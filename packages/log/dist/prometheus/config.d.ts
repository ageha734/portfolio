import { Registry } from "prom-client";
export interface PrometheusConfig {
    registry?: Registry;
    defaultLabels?: Record<string, string>;
}
export declare function createPrometheusRegistry(config?: PrometheusConfig): Registry;
//# sourceMappingURL=config.d.ts.map