import { Registry } from "prom-client";

export interface PrometheusConfig {
    registry?: Registry;
    defaultLabels?: Record<string, string>;
}

export function createPrometheusRegistry(config: PrometheusConfig = {}): Registry {
    const { registry = new Registry(), defaultLabels = {} } = config;

    if (Object.keys(defaultLabels).length > 0) {
        registry.setDefaultLabels(defaultLabels);
    }

    return registry;
}
