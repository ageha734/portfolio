import { expect, test } from "@playwright/test";

const API_URL = process.env.VITE_API_URL ?? "http://localhost:8787";

test.describe("Portfolios API", () => {
    test("should return portfolios list", async ({ request }) => {
        const response = await request.get(`${API_URL}/api/portfolios`);

        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(Array.isArray(data)).toBe(true);
    });

    test("should return portfolio by slug", async ({ request }) => {
        const listResponse = await request.get(`${API_URL}/api/portfolios`);
        const listData = await listResponse.json();

        if (Array.isArray(listData) && listData.length > 0) {
            const slug = listData[0].slug;

            const response = await request.get(`${API_URL}/api/portfolio/${slug}`);

            expect(response.status()).toBe(200);

            const data = await response.json();
            expect(data).toHaveProperty("slug", slug);
        }
    });

    test("should return 404 for non-existent slug", async ({ request }) => {
        const response = await request.get(`${API_URL}/api/portfolio/non-existent-slug-12345`);

        expect(response.status()).toBe(404);

        const data = await response.json();
        expect(data).toHaveProperty("error");
    });

    test("should return 400 for invalid slug format", async ({ request }) => {
        const response = await request.get(`${API_URL}/api/portfolio/`);

        // Should return error for invalid slug
        expect(response.status()).toBeGreaterThanOrEqual(400);
    });
});
