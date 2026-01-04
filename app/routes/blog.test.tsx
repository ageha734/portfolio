import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { filterBlogPosts } from "~/entities/blog/lib/filter-posts";
import Blog, { meta } from "./blog";

vi.mock("~/shared/api/portfolio", () => ({
    loader: vi.fn(),
}));

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useLoaderData: vi.fn(() => ({
            posts: [
                {
                    id: "1",
                    title: "Test Post",
                    slug: "test-post",
                    date: "2023-01-01",
                    imageTemp: "",
                    tags: ["Technical"],
                    sticky: false,
                },
            ],
            tags: ["Technical"],
        })),
    };
});

vi.mock("~/entities/blog/lib/filter-posts", () => ({
    filterBlogPosts: vi.fn((posts: any[]) => ({
        technical: {
            featured: posts.filter((p: any) => p.sticky && !p.tags.includes("DIY")),
            data: posts.filter((p: any) => !p.sticky && !p.tags.includes("DIY")),
        },
        diy: {
            featured: posts.filter((p: any) => p.sticky && p.tags.includes("DIY")),
            data: posts.filter((p: any) => !p.sticky && p.tags.includes("DIY")),
        },
    })),
}));

describe("blog route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (filterBlogPosts as any).mockImplementation((posts: any[]) => ({
            technical: {
                featured: posts.filter((p: any) => p.sticky && !p.tags.includes("DIY")),
                data: posts.filter((p: any) => !p.sticky && !p.tags.includes("DIY")),
            },
            diy: {
                featured: posts.filter((p: any) => p.sticky && p.tags.includes("DIY")),
                data: posts.filter((p: any) => !p.sticky && p.tags.includes("DIY")),
            },
        }));
    });

    test("should render Blog component", () => {
        const wrapper = createRouterWrapper({ route: "/blog" });
        render(<Blog />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render hero section", () => {
        const wrapper = createRouterWrapper({ route: "/blog" });
        render(<Blog />, { wrapper });

        expect(screen.getByText(/Yes, another blog/i)).toBeInTheDocument();
    });

    test("meta function should return correct metadata", () => {
        const result = meta({} as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });
});
