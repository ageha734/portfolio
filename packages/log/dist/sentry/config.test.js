import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { closeSentry, initSentry } from "./config";
vi.mock("@sentry/node", () => ({
    init: vi.fn(),
    close: vi.fn(() => Promise.resolve(true)),
    setTags: vi.fn(),
    httpIntegration: vi.fn(() => ({})),
    consoleIntegration: vi.fn(() => ({})),
    onUncaughtExceptionIntegration: vi.fn(() => ({})),
    onUnhandledRejectionIntegration: vi.fn(() => ({})),
}));
import * as Sentry from "@sentry/node";
describe("initSentry", () => {
    let consoleWarnSpy;
    beforeEach(() => {
        vi.clearAllMocks();
        consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    });
    afterEach(() => {
        consoleWarnSpy.mockRestore();
    });
    it("DSNが設定されている場合、Sentryを初期化する", () => {
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            dsn: "https://test@sentry.io/123",
        }));
    });
    it("DSNが設定されていない場合、警告を表示して初期化しない", () => {
        initSentry({});
        expect(consoleWarnSpy).toHaveBeenCalledWith("[Sentry] DSNが設定されていません。Sentryは無効化されます。");
        expect(Sentry.init).not.toHaveBeenCalled();
    });
    it("環境変数がデフォルトで設定される", () => {
        const originalEnv = process.env.NODE_ENV;
        delete process.env.NODE_ENV;
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            environment: "development",
        }));
        process.env.NODE_ENV = originalEnv;
    });
    it("カスタム環境変数を設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            environment: "production",
        });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            environment: "production",
        }));
    });
    it("リリースバージョンを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            release: "1.0.0",
        });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            release: "1.0.0",
        }));
    });
    it("トレースサンプルレートを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            tracesSampleRate: 0.5,
        });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            tracesSampleRate: 0.5,
        }));
    });
    it("プロファイルサンプルレートを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            profilesSampleRate: 0.3,
        });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            profilesSampleRate: 0.3,
        }));
    });
    it("タグを設定できる", () => {
        initSentry({
            dsn: "https://test@sentry.io/123",
            tags: { service: "api", version: "1.0.0" },
        });
        expect(Sentry.init).toHaveBeenCalled();
        expect(Sentry.setTags).toHaveBeenCalledWith({ service: "api", version: "1.0.0" });
    });
    it("beforeSendコールバックを設定できる", () => {
        const beforeSend = vi.fn();
        initSentry({
            dsn: "https://test@sentry.io/123",
            beforeSend,
        });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            beforeSend,
        }));
    });
    it("デフォルトの統合が設定される", () => {
        initSentry({ dsn: "https://test@sentry.io/123" });
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            integrations: expect.arrayContaining([
                expect.any(Object),
                expect.any(Object),
                expect.any(Object),
                expect.any(Object),
            ]),
        }));
    });
});
describe("closeSentry", () => {
    it("Sentryをクローズできる", async () => {
        await closeSentry();
        expect(Sentry.close).toHaveBeenCalled();
    });
});
