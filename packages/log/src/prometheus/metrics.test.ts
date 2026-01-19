import { describe, expect, it } from "vitest";
import { PrometheusClient } from "./client";
import { CommonMetrics } from "./metrics";
import { ErrorCodes } from "../errors/error-codes";

describe("CommonMetrics", () => {
    let client: PrometheusClient;
    let metrics: CommonMetrics;

    beforeEach(() => {
        client = new PrometheusClient();
        metrics = new CommonMetrics(client);
    });

    describe("HTTPメトリクス", () => {
        it("HTTPメトリクスが作成される", () => {
            expect(metrics.httpRequestDuration).toBeDefined();
            expect(metrics.httpRequestTotal).toBeDefined();
            expect(metrics.httpRequestErrors).toBeDefined();
        });

        it("HTTPリクエストの総数を記録できる", () => {
            metrics.httpRequestTotal.inc({ method: "GET", route: "/api/users", status: "200" });
            expect(metrics.httpRequestTotal.get().values[0]?.value).toBe(1);
        });

        it("HTTPリクエストの処理時間を記録できる", () => {
            metrics.httpRequestDuration.observe(
                { method: "GET", route: "/api/users", status: "200" },
                0.123,
            );
            const values = metrics.httpRequestDuration.get().values;
            expect(values.length).toBeGreaterThan(0);
        });

        it("HTTPリクエストエラーを記録できる", () => {
            metrics.httpRequestErrors.inc({ method: "GET", route: "/api/users", status: "500" });
            expect(metrics.httpRequestErrors.get().values[0]?.value).toBe(1);
        });

        it("複数のHTTPリクエストを記録できる", () => {
            metrics.httpRequestTotal.inc({ method: "GET", route: "/api/users", status: "200" });
            metrics.httpRequestTotal.inc({ method: "POST", route: "/api/users", status: "201" });
            const values = metrics.httpRequestTotal.get().values;
            expect(values.length).toBe(2);
        });
    });

    describe("エラーメトリクス", () => {
        it("エラーメトリクスが作成される", () => {
            expect(metrics.errorsTotal).toBeDefined();
            expect(metrics.errorsByCode).toBeDefined();
        });

        it("エラーの総数を記録できる", () => {
            metrics.errorsTotal.inc({ category: "AUTH", code: ErrorCodes.AUTH_INVALID_TOKEN });
            expect(metrics.errorsTotal.get().values[0]?.value).toBe(1);
        });

        it("エラーコード別のエラー数を記録できる", () => {
            metrics.errorsByCode.inc({
                code: ErrorCodes.AUTH_INVALID_TOKEN,
                category: "AUTH",
            });
            expect(metrics.errorsByCode.get().values[0]?.value).toBe(1);
        });

        it("複数のエラーを記録できる", () => {
            metrics.errorsTotal.inc({ category: "AUTH", code: ErrorCodes.AUTH_INVALID_TOKEN });
            metrics.errorsTotal.inc({ category: "VALIDATION", code: ErrorCodes.VALIDATION_MISSING_FIELD });
            const values = metrics.errorsTotal.get().values;
            expect(values.length).toBe(2);
        });
    });

    describe("データベースメトリクス", () => {
        it("データベースメトリクスが作成される", () => {
            expect(metrics.dbQueryDuration).toBeDefined();
            expect(metrics.dbQueryTotal).toBeDefined();
            expect(metrics.dbConnections).toBeDefined();
        });

        it("データベースクエリの実行時間を記録できる", () => {
            metrics.dbQueryDuration.observe({ operation: "SELECT", table: "users" }, 0.05);
            const values = metrics.dbQueryDuration.get().values;
            expect(values.length).toBeGreaterThan(0);
        });

        it("データベースクエリの総数を記録できる", () => {
            metrics.dbQueryTotal.inc({ operation: "SELECT", table: "users" });
            expect(metrics.dbQueryTotal.get().values[0]?.value).toBe(1);
        });

        it("データベース接続数を記録できる", () => {
            metrics.dbConnections.set({ state: "active" }, 5);
            expect(metrics.dbConnections.get().values[0]?.value).toBe(5);
        });

        it("複数のデータベース操作を記録できる", () => {
            metrics.dbQueryTotal.inc({ operation: "SELECT", table: "users" });
            metrics.dbQueryTotal.inc({ operation: "INSERT", table: "posts" });
            const values = metrics.dbQueryTotal.get().values;
            expect(values.length).toBe(2);
        });
    });

    describe("キャッシュメトリクス", () => {
        it("キャッシュメトリクスが作成される", () => {
            expect(metrics.cacheHits).toBeDefined();
            expect(metrics.cacheMisses).toBeDefined();
            expect(metrics.cacheOperations).toBeDefined();
        });

        it("キャッシュヒット数を記録できる", () => {
            metrics.cacheHits.inc({ key: "user:123" });
            expect(metrics.cacheHits.get().values[0]?.value).toBe(1);
        });

        it("キャッシュミス数を記録できる", () => {
            metrics.cacheMisses.inc({ key: "user:123" });
            expect(metrics.cacheMisses.get().values[0]?.value).toBe(1);
        });

        it("キャッシュ操作を記録できる", () => {
            metrics.cacheOperations.inc({ operation: "get", status: "success" });
            expect(metrics.cacheOperations.get().values[0]?.value).toBe(1);
        });

        it("複数のキャッシュ操作を記録できる", () => {
            metrics.cacheOperations.inc({ operation: "get", status: "success" });
            metrics.cacheOperations.inc({ operation: "set", status: "success" });
            const values = metrics.cacheOperations.get().values;
            expect(values.length).toBe(2);
        });
    });

    describe("メトリクスの再利用", () => {
        it("同じクライアントで複数のCommonMetricsインスタンスを作成できる", () => {
            const metrics1 = new CommonMetrics(client);
            const metrics2 = new CommonMetrics(client);
            expect(metrics1.httpRequestTotal).toBe(metrics2.httpRequestTotal);
        });
    });
});
