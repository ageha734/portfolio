import { Counter, Gauge, Histogram, Registry, Summary, type CounterConfiguration, type GaugeConfiguration, type HistogramConfiguration, type SummaryConfiguration } from "prom-client";
export declare class PrometheusClient {
    private readonly registry;
    private readonly counters;
    private readonly gauges;
    private readonly histograms;
    private readonly summaries;
    constructor(registry?: Registry);
    collectDefaultMetrics(): void;
    createCounter(config: CounterConfiguration<string>): Counter<string>;
    createGauge(config: GaugeConfiguration<string>): Gauge<string>;
    createHistogram(config: HistogramConfiguration<string>): Histogram<string>;
    createSummary(config: SummaryConfiguration<string>): Summary<string>;
    getCounter(name: string): Counter<string> | undefined;
    getGauge(name: string): Gauge<string> | undefined;
    getHistogram(name: string): Histogram<string> | undefined;
    getSummary(name: string): Summary<string> | undefined;
    getMetrics(): Promise<string>;
    getRegistry(): Registry;
    reset(): void;
    clear(): void;
}
//# sourceMappingURL=client.d.ts.map