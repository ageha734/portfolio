import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Blog_Slug, { links, meta } from "./blog_.$slug";

vi.mock("~/routes/api.blog.$slug", () => ({
    loader: vi.fn(),
}));

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useLoaderData: vi.fn(() => ({
            title: "Test Post",
            date: "2023-01-01",
            imageTemp: "/test.jpg",
            content: {
                raw: {
                    children: [],
                },
                html: "<p>Test content</p>",
            },
            images: {
                url: "/test.jpg",
            },
            intro: "Test intro",
        })),
    };
});

describe("blog_.$slug route", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should render Blog_Slug component", () => {
        const wrapper = createRouterWrapper({ route: "/blog/test-post" });
        render(<Blog_Slug />, { wrapper });

        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("should render post title", () => {
        const wrapper = createRouterWrapper({ route: "/blog/test-post" });
        render(<Blog_Slug />, { wrapper });

        const titles = screen.getAllByText("Test Post");
        expect(titles.length).toBeGreaterThan(0);
    });

    test("links function should return stylesheets", () => {
        const result = links();

        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
    });

    test("meta function should return correct metadata", () => {
        const result = meta({ data: { title: "Test Post", intro: "Test intro" } } as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title)).toBe(true);
    });

    test("meta function should handle missing data", () => {
        const result = meta({ data: undefined } as any);

        expect(result).toBeInstanceOf(Array);
        expect(result.some((item) => item.title === "Blog | Post not found!")).toBe(true);
    });
});
