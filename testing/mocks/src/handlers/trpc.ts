import type { HttpHandler } from "msw";
import { HttpResponse, http } from "msw";
import type { Portfolio, Post } from "../types";

const TRPC_URL = process.env.TRPC_URL || "http://localhost:8787/trpc";

const mockPosts: Post[] = [
    {
        id: "1",
        title: "Test Post 1",
        slug: "test-post-1",
        date: new Date("2024-01-01").toISOString(),
        description: "Test description",
        content: "<p>Test content</p>",
        imageTemp: "test-image.jpg",
        sticky: false,
        intro: "Test intro",
        tags: ["test", "blog"],
        createdAt: new Date("2024-01-01").toISOString(),
        updatedAt: new Date("2024-01-01").toISOString(),
    },
];

const mockPortfolios: Portfolio[] = [
    {
        id: "1",
        title: "Test Portfolio 1",
        slug: "test-portfolio-1",
        company: "Test Company",
        date: new Date("2024-01-01").toISOString(),
        current: true,
        overview: "Test overview",
        thumbnailTemp: "test-thumbnail.jpg",
        createdAt: new Date("2024-01-01").toISOString(),
        updatedAt: new Date("2024-01-01").toISOString(),
    },
];

export const trpcHandlers: HttpHandler[] = [
    http.post(`${TRPC_URL}/*`, async ({ request }) => {
        const url = new URL(request.url);
        const path = url.pathname.replace("/trpc/", "");

        const body = await request.json().catch(() => ({}));
        const requests = Array.isArray(body) ? body : [body];

        const results = requests.map((req: { method?: string; params?: { path?: string; input?: unknown } }) => {
            const method = req.method || req.params?.path || path;
            const input = req.params?.input;

            if (method === "posts.list" || method.endsWith("posts.list")) {
                return {
                    result: {
                        data: mockPosts,
                    },
                };
            }

            if (method === "posts.bySlug" || method.endsWith("posts.bySlug")) {
                const slug = typeof input === "object" && input !== null && "slug" in input ? String(input.slug) : "";
                const post = mockPosts.find((p) => p.slug === slug);
                return {
                    result: {
                        data: post || null,
                    },
                };
            }

            if (method === "portfolios.list" || method.endsWith("portfolios.list")) {
                return {
                    result: {
                        data: mockPortfolios,
                    },
                };
            }

            if (method === "portfolios.bySlug" || method.endsWith("portfolios.bySlug")) {
                const slug = typeof input === "object" && input !== null && "slug" in input ? String(input.slug) : "";
                const portfolio = mockPortfolios.find((p) => p.slug === slug);
                return {
                    result: {
                        data: portfolio || null,
                    },
                };
            }

            return {
                error: {
                    message: `Unknown tRPC method: ${method}`,
                    code: "NOT_FOUND",
                },
            };
        });

        return HttpResponse.json(Array.isArray(body) ? results : results[0]);
    }),
];
