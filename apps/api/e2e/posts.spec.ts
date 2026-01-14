import { expect, test } from "@playwright/test";

const API_URL = process.env.VITE_API_URL ?? "http://localhost:8787";
const TRPC_ENDPOINT = `${API_URL}/trpc`;

test.describe("Posts API", () => {
	test("should return posts list", async ({ request }) => {
		const response = await request.post(`${TRPC_ENDPOINT}/posts.list`, {
			data: {},
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty("result");
		expect(data.result).toHaveProperty("data");
		expect(Array.isArray(data.result.data)).toBe(true);
	});

	test("should return post by slug", async ({ request }) => {
		const listResponse = await request.post(`${TRPC_ENDPOINT}/posts.list`, {
			data: {},
		});
		const listData = await listResponse.json();

		if (listData.result?.data?.length > 0) {
			const slug = listData.result.data[0].slug;

			const response = await request.post(`${TRPC_ENDPOINT}/posts.bySlug`, {
				data: { slug },
			});

			expect(response.status()).toBe(200);

			const data = await response.json();
			expect(data).toHaveProperty("result");
			expect(data.result).toHaveProperty("data");
			expect(data.result.data).toHaveProperty("slug", slug);
		}
	});

	test("should return null for non-existent slug", async ({ request }) => {
		const response = await request.post(`${TRPC_ENDPOINT}/posts.bySlug`, {
			data: { slug: "non-existent-slug-12345" },
		});

		expect(response.status()).toBe(200);

		const data = await response.json();
		expect(data).toHaveProperty("result");
		expect(data.result).toHaveProperty("data");
		expect(data.result.data).toBeNull();
	});

	test("should validate input for bySlug query", async ({ request }) => {
		const response = await request.post(`${TRPC_ENDPOINT}/posts.bySlug`, {
			data: {},
		});

		// Should return error for missing slug
		expect(response.status()).toBeGreaterThanOrEqual(400);
	});
});
