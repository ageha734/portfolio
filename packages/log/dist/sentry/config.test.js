import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import * as Sentry from "@sentry/node";
import { initSentry, closeSentry } from "./config";
describe("initSentry", () => {
    let initSpy;
    let consoleWarnSpy;
    let setTagsSpy;
    beforeEach(() => {
        initSpy = vi.spyOn(Sentry, "init").mockImplementation(() => undefined);
        consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
        setTagsSpy = vi.spyOn(Sentry, "setTags").mockImplementation(() => { });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it("DSNが設定されている場合、Sentryを初期化する", () => {
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            dsn: "https://test@sentry.io/123",
        }));
    });
    it("DSNが設定されていない場合、警告を表示して初期化しない", () => {
        initSentry({});
        expect(consoleWarnSpy).toHaveBeenCalledWith("[Sentry] DSNが設定されていません。Sentryは無効化されます。");
        expect(initSpy).not.toHaveBeenCalled();
    });
    it("環境変数がデフォルトで設定される", () => {
        const originalEnv = process.env.NODE_ENV;
        delete process.env.NODE_ENV;
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            environment: "development",
        }));
        process.env.NODE_ENV = originalEnv;
    });
    it("カスタム環境変数を設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            environment: "production",
        });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            environment: "production",
        }));
    });
    it("リリースバージョンを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            release: "1.0.0",
        });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            release: "1.0.0",
        }));
    });
    it("トレースサンプルレートを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            tracesSampleRate: 0.5,
        });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            tracesSampleRate: 0.5,
        }));
    });
    it("プロファイルサンプルレートを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            profilesSampleRate: 0.3,
        });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            profilesSampleRate: 0.3,
        }));
    });
    it("タグを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            tags: { service: "api", version: "1.0.0" },
        });
        expect(initSpy).toHaveBeenCalled();
        expect(setTagsSpy).toHaveBeenCalledWith({ service: "api", version: "1.0.0" });
    });
    it("beforeSendコールバックを設定できる", () => {
        const beforeSend = vi.fn();
        initSentry({
            dsn: "https://test@sentry.io/123",
            beforeSend,
        });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            beforeSend,
        }));
    });
    it("デフォルトの統合が設定される", () => {
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(initSpy).toHaveBeenCalledWith(expect.objectContaining({
            integrations: expect.arrayContaining([
                expect.any(Object), // httpIntegration
                expect.any(Object), // consoleIntegration
                expect.any(Object), // onUncaughtExceptionIntegration
                expect.any(Object), // onUnhandledRejectionIntegration
            ]),
        }));
    });
});
describe("closeSentry", () => {
    it("Sentryをクローズできる", async () => {
        const closeSpy = vi.spyOn(Sentry, "close").mockResolvedValue(true);
        await closeSentry();
        expect(closeSpy).toHaveBeenCalled();
    });
});
