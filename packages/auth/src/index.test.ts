import { describe, expect, test, vi } from "vitest";
import { initAuth } from "./index";

// Mock @portfolio/db
vi.mock("@portfolio/db", () => ({
    createPrismaClient: vi.fn(() => ({
        $disconnect: vi.fn(),
    })),
}));

// Mock better-auth
vi.mock("better-auth", () => ({
    betterAuth: vi.fn((config) => ({
        api: {
            getSession: vi.fn(),
        },
        $Infer: {
            Session: {},
        },
    })),
}));

vi.mock("better-auth/adapters/prisma", () => ({
    prismaAdapter: vi.fn((prisma, options) => ({
        provider: options.provider,
    })),
}));

vi.mock("better-auth/plugins", () => ({
    oAuthProxy: vi.fn((options) => ({
        productionURL: options.productionURL,
    })),
}));

describe("initAuth", () => {
    test("should initialize auth with Google SSO", () => {
        const auth = initAuth({
            baseUrl: "http://localhost:3000",
            productionUrl: "http://localhost:3000",
            secret: "test-secret",
            googleClientId: "test-google-client-id",
            googleClientSecret: "test-google-client-secret",
        });

        expect(auth).toBeDefined();
    });

    test("should initialize auth with D1Database for production", () => {
        const mockD1 = {} as D1Database;

        const auth = initAuth({
            baseUrl: "http://localhost:3000",
            productionUrl: "http://localhost:3000",
            secret: "test-secret",
            googleClientId: "test-google-client-id",
            googleClientSecret: "test-google-client-secret",
            d1: mockD1,
        });

        expect(auth).toBeDefined();
    });

    test("should initialize auth with databaseUrl for development", () => {
        const auth = initAuth({
            baseUrl: "http://localhost:3000",
            productionUrl: "http://localhost:3000",
            secret: "test-secret",
            googleClientId: "test-google-client-id",
            googleClientSecret: "test-google-client-secret",
            databaseUrl: "mysql://user:password@localhost:3306/portfolio",
        });

        expect(auth).toBeDefined();
    });

    test("should initialize auth with extra plugins", () => {
        const extraPlugin = {
            id: "test-plugin",
            install: vi.fn(),
        };

        const auth = initAuth({
            baseUrl: "http://localhost:3000",
            productionUrl: "http://localhost:3000",
            secret: "test-secret",
            googleClientId: "test-google-client-id",
            googleClientSecret: "test-google-client-secret",
            extraPlugins: [extraPlugin],
        });

        expect(auth).toBeDefined();
    });
});
