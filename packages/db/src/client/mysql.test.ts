import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface MockPrismaClient {
    _config: {
        datasources: {
            db: {
                url: string | undefined;
            };
        };
    };
    $connect: ReturnType<typeof vi.fn>;
    $disconnect: ReturnType<typeof vi.fn>;
}

// PrismaClientをモック
vi.mock("@prisma/client", () => ({
    PrismaClient: vi.fn().mockImplementation((config) => ({
        _config: config,
        $connect: vi.fn(),
        $disconnect: vi.fn(),
    })),
}));

describe("createPrismaClient", () => {
    let originalEnv: string | undefined;

    beforeEach(() => {
        originalEnv = process.env.DATABASE_URL;
    });

    afterEach(() => {
        if (originalEnv !== undefined) {
            process.env.DATABASE_URL = originalEnv;
        } else {
            delete process.env.DATABASE_URL;
        }
        vi.clearAllMocks();
    });

    describe("singleton behavior", () => {
        beforeEach(() => {
            vi.resetModules();
        });

        test("should create a new PrismaClient instance", async () => {
            const { createPrismaClient } = await import("./mysql");

            const client = createPrismaClient({ databaseUrl: "mysql://test:test@localhost/test" }) as unknown as MockPrismaClient;

            expect(client).toBeDefined();
            expect(client._config).toBeDefined();
        });

        test("should return the same instance on subsequent calls (singleton)", async () => {
            const { createPrismaClient } = await import("./mysql");

            const client1 = createPrismaClient({ databaseUrl: "mysql://test:test@localhost/test" });
            const client2 = createPrismaClient({ databaseUrl: "mysql://other:other@localhost/other" });

            expect(client1).toBe(client2);
        });

        test("should use provided databaseUrl option", async () => {
            const { createPrismaClient } = await import("./mysql");
            const testUrl = "mysql://custom:custom@localhost/custom";

            const client = createPrismaClient({ databaseUrl: testUrl }) as unknown as MockPrismaClient;

            expect(client._config.datasources.db.url).toBe(testUrl);
        });
    });

    describe("environment variable fallback", () => {
        beforeEach(() => {
            vi.resetModules();
        });

        test("should fallback to DATABASE_URL environment variable when no url provided", async () => {
            process.env.DATABASE_URL = "mysql://env:env@localhost/env";
            const { createPrismaClient } = await import("./mysql");

            const client = createPrismaClient() as unknown as MockPrismaClient;

            expect(client._config.datasources.db.url).toBe("mysql://env:env@localhost/env");
        });

        test("should use undefined url when neither option nor env var is provided", async () => {
            delete process.env.DATABASE_URL;
            const { createPrismaClient } = await import("./mysql");

            const client = createPrismaClient() as unknown as MockPrismaClient;

            expect(client._config.datasources.db.url).toBeUndefined();
        });

        test("should accept empty options object", async () => {
            process.env.DATABASE_URL = "mysql://default:default@localhost/default";
            const { createPrismaClient } = await import("./mysql");

            const client = createPrismaClient({}) as unknown as MockPrismaClient;

            expect(client).toBeDefined();
            expect(client._config.datasources.db.url).toBe("mysql://default:default@localhost/default");
        });
    });

    describe("singleton caching", () => {
        test("should return cached instance when called multiple times", async () => {
            vi.resetModules();
            const { createPrismaClient } = await import("./mysql");

            // 最初の呼び出し - 新しいインスタンスを作成
            const firstCall = createPrismaClient({ databaseUrl: "mysql://first:first@localhost/first" });
            // 2回目の呼び出し - キャッシュされたインスタンスを返す
            const secondCall = createPrismaClient({ databaseUrl: "mysql://second:second@localhost/second" });
            // 3回目の呼び出し - キャッシュされたインスタンスを返す
            const thirdCall = createPrismaClient();

            expect(firstCall).toBe(secondCall);
            expect(secondCall).toBe(thirdCall);
        });
    });
});
