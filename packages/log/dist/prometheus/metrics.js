import { Counter, Gauge, Histogram } from "prom-client";
import { PrometheusClient } from "./client";
export class CommonMetrics {
    httpRequestDuration;
    httpRequestTotal;
    httpRequestErrors;
    errorsTotal;
    errorsByCode;
    dbQueryDuration;
    dbQueryTotal;
    dbConnections;
    cacheHits;
    cacheMisses;
    cacheOperations;
    constructor(client) {
        this.httpRequestDuration = client.createHistogram({
            name: "http_request_duration_seconds",
            help: "HTTPリクエストの処理時間（秒）",
            labelNames: ["method", "route", "status"],
            buckets: [0.1, 0.5, 1, 2, 5, 10],
        });
        this.httpRequestTotal = client.createCounter({
            name: "http_requests_total",
            help: "HTTPリクエストの総数",
            labelNames: ["method", "route", "status"],
        });
        this.httpRequestErrors = client.createCounter({
            name: "http_request_errors_total",
            help: "HTTPリクエストエラーの総数",
            labelNames: ["method", "route", "status"],
        });
        this.errorsTotal = client.createCounter({
            name: "errors_total",
            help: "エラーの総数",
            labelNames: ["category", "code"],
        });
        this.errorsByCode = client.createCounter({
            name: "errors_by_code_total",
            help: "エラーコード別のエラー数",
            labelNames: ["code", "category"],
        });
        this.dbQueryDuration = client.createHistogram({
            name: "db_query_duration_seconds",
            help: "データベースクエリの実行時間（秒）",
            labelNames: ["operation", "table"],
            buckets: [0.01, 0.05, 0.1, 0.5, 1, 2],
        });
        this.dbQueryTotal = client.createCounter({
            name: "db_queries_total",
            help: "データベースクエリの総数",
            labelNames: ["operation", "table"],
        });
        this.dbConnections = client.createGauge({
            name: "db_connections_active",
            help: "アクティブなデータベース接続数",
            labelNames: ["state"],
        });
        this.cacheHits = client.createCounter({
            name: "cache_hits_total",
            help: "キャッシュヒット数",
            labelNames: ["key"],
        });
        this.cacheMisses = client.createCounter({
            name: "cache_misses_total",
            help: "キャッシュミス数",
            labelNames: ["key"],
        });
        this.cacheOperations = client.createCounter({
            name: "cache_operations_total",
            help: "キャッシュ操作の総数",
            labelNames: ["operation", "status"],
        });
    }
}
