import { http, HttpResponse } from "msw";
import type { Post, Portfolio } from "~/shared/types";
import type { GraphQLRequest, GraphQLResponse } from "./types";

/**
 * GraphCMS APIのモックハンドラー
 *
 * TypeSpecで定義されたスキーマ（api/graphcms.tsp）に基づいて実装されています。
 * GraphQLリクエスト/レスポンスの構造は、TypeSpecで定義された以下のモデルに準拠しています：
 * - GraphQLRequest: リクエストボディ
 * - GraphQLResponse: 成功レスポンス（200）
 * - GraphQLError: エラーレスポンス（400, 401, 404）
 *
 * 型定義は tests/mocks/types.ts で定義されており、
 * api/graphcms.tsp のスキーマ定義と対応しています。
 */

const GRAPHCMS_URL = process.env.GRAPHCMS_URL || "https://api.graphcms.com/v2/";

const mockPosts: Post[] = [
    {
        id: "1",
        title: "Test Post 1",
        slug: "test-post-1",
        date: "2024-01-01",
        description: "Test description",
        content: {
            html: "<p>Test content</p>",
            raw: {
                children: [
                    {
                        type: "paragraph",
                        children: [{ text: "Test content" }],
                    },
                ],
            },
        },
        imageTemp: "/images/test-1.jpg",
        tags: ["Test", "Blog"],
        sticky: false,
        intro: "Test intro",
    },
    {
        id: "2",
        title: "Test Post 2",
        slug: "test-post-2",
        date: "2024-01-02",
        description: "Test description 2",
        content: {
            html: "<p>Test content 2</p>",
            raw: {
                children: [
                    {
                        type: "paragraph",
                        children: [{ text: "Test content 2" }],
                    },
                ],
            },
        },
        imageTemp: "/images/test-2.jpg",
        tags: ["DIY"],
        sticky: true,
        intro: "Test intro 2",
    },
];

const mockPortfolios: Portfolio[] = [
    {
        id: "1",
        title: "Test Portfolio 1",
        slug: "test-portfolio-1",
        company: "Test Company",
        date: "2024-01-01",
        current: true,
        overview: "Test overview",
        description: "Test description",
        thumbnailTemp: "/images/portfolio-1.jpg",
        images: [
            {
                url: "/images/portfolio-1.jpg",
            },
        ],
    },
    {
        id: "2",
        title: "Test Portfolio 2",
        slug: "test-portfolio-2",
        company: "Test Company 2",
        date: "2023-12-01",
        current: false,
        overview: "Test overview 2",
        description: "Test description 2",
        thumbnailTemp: "/images/portfolio-2.jpg",
        images: [
            {
                url: "/images/portfolio-2.jpg",
            },
        ],
    },
];

const mockTags = ["Test", "Blog", "DIY", "Technical"];

function extractSlug(query: string, variables?: Record<string, unknown>): string | null {
    const literalPattern = /slug: "([^"]+)"/;
    const variablePattern = /slug: \$slug/;

    const literalMatch = literalPattern.exec(query);
    if (literalMatch?.[1]) {
        return literalMatch[1];
    }

    if (variablePattern.exec(query) && variables && typeof variables.slug === "string") {
        return variables.slug;
    }

    return null;
}

function handleGetPosts(): GraphQLResponse {
    return {
        data: {
            posts: mockPosts,
            __type: {
                enumValues: mockTags.map((tag) => ({ name: tag })),
            },
        },
    };
}

function handleGetPost(query: string, variables?: Record<string, unknown>): GraphQLResponse {
    const slug = extractSlug(query, variables);
    const post = slug ? mockPosts.find((p) => p.slug === slug) : null;

    if (!post) {
        return {
            errors: [
                {
                    message: `Post with slug "${slug}" not found`,
                    path: ["post"],
                },
            ],
        };
    }

    return {
        data: {
            post: {
                ...post,
                images: [{ url: post.imageTemp }],
                createdAt: "2024-01-01T00:00:00Z",
                updatedAt: "2024-01-01T00:00:00Z",
            },
        },
    };
}

function handleGetPortfolios(): GraphQLResponse {
    return {
        data: {
            portfolios: mockPortfolios,
        },
    };
}

function handleGetPortfolioBySlug(query: string, variables?: Record<string, unknown>): GraphQLResponse {
    const slug = extractSlug(query, variables);
    const portfolio = slug ? mockPortfolios.find((p) => p.slug === slug) : null;

    if (!portfolio) {
        return {
            errors: [
                {
                    message: `Portfolio with slug "${slug}" not found`,
                    path: ["portfolios"],
                },
            ],
        };
    }

    return {
        data: {
            portfolios: [
                {
                    ...portfolio,
                    content: {
                        html: `<p>${portfolio.description || ""}</p>`,
                    },
                },
            ],
        },
    };
}

function handleGetSitemap(): GraphQLResponse {
    return {
        data: {
            posts: mockPosts.map((post) => ({
                slug: post.slug,
                title: post.title,
                date: post.date,
            })),
            portfolios: mockPortfolios.map((portfolio) => ({
                slug: portfolio.slug,
                title: portfolio.title,
                date: portfolio.date,
            })),
            __type: {
                enumValues: mockTags.map((tag) => ({ name: tag })),
            },
        },
    };
}

export const graphcmsHandlers = [
    http.post(GRAPHCMS_URL, async ({ request }) => {
        const body = (await request.json()) as GraphQLRequest;
        const { query, variables } = body;

        if (query.includes("posts(orderBy: date_DESC)")) {
            return HttpResponse.json(handleGetPosts());
        }

        if (query.includes("post(where: { slug:")) {
            const response = handleGetPost(query, variables);
            const status = response.errors ? 404 : 200;
            return HttpResponse.json(response, { status });
        }

        if (query.includes("portfolios(orderBy: date_DESC)")) {
            return HttpResponse.json(handleGetPortfolios());
        }

        if (query.includes("portfolios(where: { slug:")) {
            const response = handleGetPortfolioBySlug(query, variables);
            const status = response.errors ? 404 : 200;
            return HttpResponse.json(response, { status });
        }

        if (query.includes("__type(name: \"Tags\")") && query.includes("portfolios(orderBy: date_DESC)")) {
            return HttpResponse.json(handleGetSitemap());
        }

        return HttpResponse.json({ data: {} });
    }),
];
