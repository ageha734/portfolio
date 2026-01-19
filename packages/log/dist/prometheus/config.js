import { Registry } from "prom-client";
export function createPrometheusRegistry(config = {}) {
    const { registry = new Registry(), defaultLabels = {} } = config;
    if (Object.keys(defaultLabels).length > 0) {
        registry.setDefaultLabels(defaultLabels);
    }
    return registry;
}
