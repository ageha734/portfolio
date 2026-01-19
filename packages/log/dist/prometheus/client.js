import { Counter, Gauge, Histogram, Registry, Summary, collectDefaultMetrics, } from "prom-client";
export class PrometheusClient {
    registry;
    counters = new Map();
    gauges = new Map();
    histograms = new Map();
    summaries = new Map();
    constructor(registry) {
        this.registry = registry ?? new Registry();
    }
    collectDefaultMetrics() {
        collectDefaultMetrics({ register: this.registry });
    }
    createCounter(config) {
        const existing = this.counters.get(config.name);
        if (existing) {
            return existing;
        }
        const counter = new Counter({
            ...config,
            registers: [this.registry],
        });
        this.counters.set(config.name, counter);
        return counter;
    }
    createGauge(config) {
        const existing = this.gauges.get(config.name);
        if (existing) {
            return existing;
        }
        const gauge = new Gauge({
            ...config,
            registers: [this.registry],
        });
        this.gauges.set(config.name, gauge);
        return gauge;
    }
    createHistogram(config) {
        const existing = this.histograms.get(config.name);
        if (existing) {
            return existing;
        }
        const histogram = new Histogram({
            ...config,
            registers: [this.registry],
        });
        this.histograms.set(config.name, histogram);
        return histogram;
    }
    createSummary(config) {
        const existing = this.summaries.get(config.name);
        if (existing) {
            return existing;
        }
        const summary = new Summary({
            ...config,
            registers: [this.registry],
        });
        this.summaries.set(config.name, summary);
        return summary;
    }
    getCounter(name) {
        return this.counters.get(name);
    }
    getGauge(name) {
        return this.gauges.get(name);
    }
    getHistogram(name) {
        return this.histograms.get(name);
    }
    getSummary(name) {
        return this.summaries.get(name);
    }
    async getMetrics() {
        return this.registry.metrics();
    }
    getRegistry() {
        return this.registry;
    }
    reset() {
        this.registry.resetMetrics();
    }
    clear() {
        this.counters.clear();
        this.gauges.clear();
        this.histograms.clear();
        this.summaries.clear();
        this.registry.clear();
    }
}
