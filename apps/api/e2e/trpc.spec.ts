import { expect, test } from "@playwright/test";

const API_URL = process.env.VITE_API_URL ?? "http://localhost:8787";
const TRPC_ENDPOINT = `${API_URL}/trpc`;

test.describe("tRPC API", () => {
    test("should respond to health check", async ({ request }) => {
        const response = await request.get(TRPC_ENDPOINT);
        expect(response.status()).toBeGreaterThanOrEqual(200);
        expect(response.status()).toBeLessThan(500);
    });

    test("should handle invalid endpoint", async ({ request }) => {
        const response = await request.get(`${TRPC_ENDPOINT}/invalid`);
        expect(response.status()).toBeGreaterThanOrEqual(400);
    });

    test("should return JSON content type", async ({ request }) => {
        const response = await request.post(`${TRPC_ENDPOINT}/posts.list`, {
            data: {},
        });
        const contentType = response.headers()["content-type"];
        expect(contentType).toContain("application/json");
    });
});
