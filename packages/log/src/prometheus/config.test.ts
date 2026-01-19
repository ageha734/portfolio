import { describe, expect, it } from "vitest";
import { Registry } from "prom-client";
import { createPrometheusRegistry } from "./config";

describe("createPrometheusRegistry", () => {
    it("デフォルトで新しいレジストリを作成する", () => {
        const registry = createPrometheusRegistry();
        expect(registry).toBeInstanceOf(Registry);
    });

    it("カスタムレジストリを使用できる", () => {
        const customRegistry = new Registry();
        const registry = createPrometheusRegistry({ registry: customRegistry });
        expect(registry).toBe(customRegistry);
    });

    it("デフォルトラベルを設定できる", () => {
        const registry = createPrometheusRegistry({
            defaultLabels: { service: "api", environment: "production" },
        });
        const labels = registry.getDefaultLabels();
        expect(labels).toEqual({ service: "api", environment: "production" });
    });

    it("デフォルトラベルなしでもレジストリを作成できる", () => {
        const registry = createPrometheusRegistry({ defaultLabels: {} });
        expect(registry).toBeInstanceOf(Registry);
    });

    it("デフォルトラベルとカスタムレジストリを組み合わせられる", () => {
        const customRegistry = new Registry();
        const registry = createPrometheusRegistry({
            registry: customRegistry,
            defaultLabels: { service: "api" },
        });
        expect(registry).toBe(customRegistry);
        const labels = registry.getDefaultLabels();
        expect(labels).toEqual({ service: "api" });
    });
});
