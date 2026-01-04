import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRouterWrapper } from "@vi/render";
import App, { ErrorBoundary, loader, links, meta } from "./root";

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useLoaderData: vi.fn(() => ({
            canonicalUrl: "https://example.com",
            theme: "dark",
        })),
        useFetcher: vi.fn(() => ({
            formData: null,
            submit: vi.fn(),
        })),
        useNavigation: vi.fn(() => ({
            state: "idle",
        })),
        Outlet: () => <div data-testid="outlet">Outlet</div>,
    };
});

vi.mock("~/shared/hooks/lib/useIntro", () => ({
    useIntro: vi.fn(),
}));

vi.mock("~/shared/hooks/lib/usePageTracking", () => ({
    usePageTracking: vi.fn(),
}));

describe("root", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("App component", () => {
        test("should render App component", () => {
            const wrapper = createRouterWrapper({ route: "/" });
            render(<App />, { wrapper });

            expect(screen.getByTestId("outlet")).toBeInTheDocument();
        });

        test("should render html element with lang attribute", () => {
            const wrapper = createRouterWrapper({ route: "/" });
            const { container } = render(<App />, { wrapper });

            const html = container.querySelector("html");
            expect(html).toHaveAttribute("lang", "en");
        });
    });

    describe("ErrorBoundary", () => {
        test("should render ErrorBoundary", () => {
            const wrapper = createRouterWrapper({ route: "/" });
            render(<ErrorBoundary />, { wrapper });

            // ErrorBoundary should render ErrorPage component
            expect(screen.getByRole("document")).toBeInTheDocument();
        });
    });

    describe("links function", () => {
        test("should return links array", () => {
            const result = links();

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });

        test("should include manifest link", () => {
            const result = links();

            expect(result.some((link) => link.rel === "manifest")).toBe(true);
        });

        test("should include favicon link", () => {
            const result = links();

            expect(result.some((link) => link.rel === "icon")).toBe(true);
        });
    });

    describe("loader function", () => {
        test("should return canonical URL and theme", async () => {
            const args = {
                request: new Request("https://example.com/"),
                context: {
                    cloudflare: {
                        env: {
                            SESSION_SECRET: "test-secret",
                        },
                    },
                },
            } as any;

            const result = await loader(args);
            const json = await result.json();

            expect(json).toHaveProperty("canonicalUrl");
            expect(json).toHaveProperty("theme");
        });

        test("should handle pathname ending with slash", async () => {
            const args = {
                request: new Request("https://example.com/test/"),
                context: {
                    cloudflare: {
                        env: {
                            SESSION_SECRET: "test-secret",
                        },
                    },
                },
            } as any;

            const result = await loader(args);
            const json = await result.json();

            expect(json.canonicalUrl).toBeDefined();
        });

        test("should default theme to dark", async () => {
            const args = {
                request: new Request("https://example.com/"),
                context: {
                    cloudflare: {
                        env: {
                            SESSION_SECRET: "test-secret",
                        },
                    },
                },
            } as any;

            const result = await loader(args);
            const json = await result.json();

            expect(json.theme).toBe("dark");
        });
    });

    describe("meta function", () => {
        test("should return metadata array", () => {
            const result = meta({
                data: {
                    theme: "dark",
                    canonicalUrl: "https://example.com",
                },
            } as any);

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThan(0);
        });

        test("should include charset", () => {
            const result = meta({
                data: {
                    theme: "dark",
                    canonicalUrl: "https://example.com",
                },
            } as any);

            expect(result.some((item) => item.charset === "utf-8")).toBe(true);
        });

        test("should include viewport", () => {
            const result = meta({
                data: {
                    theme: "dark",
                    canonicalUrl: "https://example.com",
                },
            } as any);

            expect(result.some((item) => item.tagName === "meta" && item.name === "viewport")).toBe(true);
        });

        test("should handle light theme", () => {
            const result = meta({
                data: {
                    theme: "light",
                    canonicalUrl: "https://example.com",
                },
            } as any);

            expect(
                result.some(
                    (item) => item.tagName === "meta" && item.name === "theme-color" && item.content === "#F2F2F2",
                ),
            ).toBe(true);
        });

        test("should handle dark theme", () => {
            const result = meta({
                data: {
                    theme: "dark",
                    canonicalUrl: "https://example.com",
                },
            } as any);

            expect(
                result.some(
                    (item) => item.tagName === "meta" && item.name === "theme-color" && item.content === "#111",
                ),
            ).toBe(true);
        });
    });
});
