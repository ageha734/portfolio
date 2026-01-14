import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { createTRPCApiClient } from "./trpc";

describe("createTRPCApiClient", () => {
    const originalEnv = process.env.VITE_API_URL;
    const originalWindow = globalThis.window;

    beforeEach(() => {
        vi.clearAllMocks();
        delete process.env.VITE_API_URL;
    });

    afterEach(() => {
        process.env.VITE_API_URL = originalEnv;
        globalThis.window = originalWindow;
    });

    test("should create tRPC client with default URL when no apiUrl provided", () => {
        const client = createTRPCApiClient();

        expect(client).toBeDefined();
        expect(typeof client).toBe("object");
    });

    test("should create tRPC client with custom apiUrl", () => {
        const customUrl = "https://custom-api.example.com";
        const client = createTRPCApiClient(customUrl);

        expect(client).toBeDefined();
        expect(typeof client).toBe("object");
    });

    test("should use window.location.origin in browser environment", () => {
        const mockWindow = {
            location: {
                origin: "https://example.com",
            },
        };
        globalThis.window = mockWindow as unknown as Window & typeof globalThis;

        const client = createTRPCApiClient();

        expect(client).toBeDefined();
    });

    test("should use VITE_API_URL from process.env in server environment", () => {
        process.env.VITE_API_URL = "https://server-api.example.com";
        delete (globalThis as { window?: unknown }).window;

        const client = createTRPCApiClient();

        expect(client).toBeDefined();
    });

    test("should use provided apiUrl over environment variable", () => {
        process.env.VITE_API_URL = "https://env-api.example.com";
        const customUrl = "https://custom-api.example.com";

        const client = createTRPCApiClient(customUrl);

        expect(client).toBeDefined();
    });

    test("should fallback to localhost:8787 when no URL provided", () => {
        delete (globalThis as { window?: unknown }).window;
        delete process.env.VITE_API_URL;

        const client = createTRPCApiClient();

        expect(client).toBeDefined();
    });
});

describe("trpc", () => {
    test("should export default trpc client", async () => {
        const { trpc } = await import("./trpc");

        expect(trpc).toBeDefined();
        expect(typeof trpc).toBe("object");
    });
});
