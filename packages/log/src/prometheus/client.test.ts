import { Registry } from "prom-client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrometheusClient } from "./client";

describe("PrometheusClient", () => {
    let client: PrometheusClient;

    beforeEach(() => {
        client = new PrometheusClient();
        vi.clearAllMocks();
    });

    describe("Counter", () => {
        it("Counterを作成できる", () => {
            const counter = client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            expect(counter).toBeDefined();
        });

        it("同じ名前のCounterは再利用される", () => {
            const counter1 = client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            const counter2 = client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            expect(counter1).toBe(counter2);
        });

        it("Counterを取得できる", () => {
            const counter = client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            const retrieved = client.getCounter("test_counter");
            expect(retrieved).toBe(counter);
        });

        it("存在しないCounterはundefinedを返す", () => {
            const retrieved = client.getCounter("nonexistent");
            expect(retrieved).toBeUndefined();
        });
    });

    describe("Gauge", () => {
        it("Gaugeを作成できる", () => {
            const gauge = client.createGauge({
                name: "test_gauge",
                help: "Test gauge",
            });
            expect(gauge).toBeDefined();
        });

        it("同じ名前のGaugeは再利用される", () => {
            const gauge1 = client.createGauge({
                name: "test_gauge",
                help: "Test gauge",
            });
            const gauge2 = client.createGauge({
                name: "test_gauge",
                help: "Test gauge",
            });
            expect(gauge1).toBe(gauge2);
        });

        it("Gaugeを取得できる", () => {
            const gauge = client.createGauge({
                name: "test_gauge",
                help: "Test gauge",
            });
            const retrieved = client.getGauge("test_gauge");
            expect(retrieved).toBe(gauge);
        });

        it("存在しないGaugeはundefinedを返す", () => {
            const retrieved = client.getGauge("nonexistent");
            expect(retrieved).toBeUndefined();
        });
    });

    describe("Histogram", () => {
        it("Histogramを作成できる", () => {
            const histogram = client.createHistogram({
                name: "test_histogram",
                help: "Test histogram",
            });
            expect(histogram).toBeDefined();
        });

        it("同じ名前のHistogramは再利用される", () => {
            const histogram1 = client.createHistogram({
                name: "test_histogram",
                help: "Test histogram",
            });
            const histogram2 = client.createHistogram({
                name: "test_histogram",
                help: "Test histogram",
            });
            expect(histogram1).toBe(histogram2);
        });

        it("Histogramを取得できる", () => {
            const histogram = client.createHistogram({
                name: "test_histogram",
                help: "Test histogram",
            });
            const retrieved = client.getHistogram("test_histogram");
            expect(retrieved).toBe(histogram);
        });

        it("存在しないHistogramはundefinedを返す", () => {
            const retrieved = client.getHistogram("nonexistent");
            expect(retrieved).toBeUndefined();
        });
    });

    describe("Summary", () => {
        it("Summaryを作成できる", () => {
            const summary = client.createSummary({
                name: "test_summary",
                help: "Test summary",
            });
            expect(summary).toBeDefined();
        });

        it("同じ名前のSummaryは再利用される", () => {
            const summary1 = client.createSummary({
                name: "test_summary",
                help: "Test summary",
            });
            const summary2 = client.createSummary({
                name: "test_summary",
                help: "Test summary",
            });
            expect(summary1).toBe(summary2);
        });

        it("Summaryを取得できる", () => {
            const summary = client.createSummary({
                name: "test_summary",
                help: "Test summary",
            });
            const retrieved = client.getSummary("test_summary");
            expect(retrieved).toBe(summary);
        });

        it("存在しないSummaryはundefinedを返す", () => {
            const retrieved = client.getSummary("nonexistent");
            expect(retrieved).toBeUndefined();
        });
    });

    describe("getMetrics", () => {
        it("メトリクスを取得できる", async () => {
            client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            const metrics = await client.getMetrics();
            expect(metrics).toContain("test_counter");
        });

        it("複数のメトリクスを含む", async () => {
            client.createCounter({ name: "counter1", help: "Counter 1" });
            client.createGauge({ name: "gauge1", help: "Gauge 1" });
            client.createHistogram({ name: "histogram1", help: "Histogram 1" });
            const metrics = await client.getMetrics();
            expect(metrics).toContain("counter1");
            expect(metrics).toContain("gauge1");
            expect(metrics).toContain("histogram1");
        });
    });

    describe("reset", () => {
        it("メトリクスをリセットできる", async () => {
            const counter = client.createCounter({
                name: "test_counter",
                help: "Test counter",
            });
            counter.inc();
            const metrics1 = await counter.get();
            expect(metrics1.values[0]?.value).toBe(1);
            client.reset();
            const metrics2 = await counter.get();
            expect(metrics2.values[0]?.value).toBe(0);
        });
    });

    describe("clear", () => {
        it("すべてのメトリクスをクリアできる", () => {
            client.createCounter({ name: "counter1", help: "Counter 1" });
            client.createGauge({ name: "gauge1", help: "Gauge 1" });
            expect(client.getCounter("counter1")).toBeDefined();
            expect(client.getGauge("gauge1")).toBeDefined();
            client.clear();
            expect(client.getCounter("counter1")).toBeUndefined();
            expect(client.getGauge("gauge1")).toBeUndefined();
        });
    });

    describe("collectDefaultMetrics", () => {
        it("デフォルトメトリクスの収集を開始できる", async () => {
            client.collectDefaultMetrics();
            const metrics = await client.getMetrics();
            expect(metrics).toContain("process_");
        });
    });

    describe("getRegistry", () => {
        it("レジストリを取得できる", () => {
            const registry = client.getRegistry();
            expect(registry).toBeInstanceOf(Registry);
        });
    });
});
