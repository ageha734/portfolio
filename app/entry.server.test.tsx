import { expect, test, describe, vi, beforeEach } from "vitest";
import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";

// Note: entry.server.tsx is an entry point file that runs at module load time.
// Testing it requires mocking React server-side rendering APIs.
// This test file provides basic structure validation.

const mockRenderToReadableStream = vi.fn().mockResolvedValue({
    allReady: Promise.resolve(),
});

vi.mock("react-dom/server", () => ({
    renderToReadableStream: (...args: any[]) => mockRenderToReadableStream(...args),
}));

vi.mock("@remix-run/react", () => ({
    RemixServer: vi.fn(({ context, url }: { context: EntryContext; url: string }) => {
        return null;
    }),
}));

const mockIsbot = vi.fn().mockReturnValue(false);

vi.mock("isbot", () => ({
    default: (...args: any[]) => mockIsbot(...args),
}));

describe("entry.server", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRenderToReadableStream.mockResolvedValue({
            allReady: Promise.resolve(),
        });
        mockIsbot.mockReturnValue(false);
    });

    test("should export handleRequest function", async () => {
        const handleRequest = (await import("./entry.server")).default;
        expect(handleRequest).toBeDefined();
        expect(typeof handleRequest).toBe("function");
    });

    test("should handle request and return Response", async () => {
        const handleRequest = (await import("./entry.server")).default;
        const request = new Request("https://example.com/");
        const remixContext = {} as EntryContext;
        const loadContext = {} as AppLoadContext;

        const result = await handleRequest(request, 200, new Headers(), remixContext, loadContext);

        expect(result).toBeInstanceOf(Response);
    });

    test("should set Content-Type header", async () => {
        const handleRequest = (await import("./entry.server")).default;
        const request = new Request("https://example.com/");
        const remixContext = {} as EntryContext;
        const loadContext = {} as AppLoadContext;
        const headers = new Headers();

        const result = await handleRequest(request, 200, headers, remixContext, loadContext);

        expect(result.headers.get("Content-Type")).toBe("text/html");
    });

    test("should handle bot user agent", async () => {
        mockIsbot.mockReturnValue(true);
        mockRenderToReadableStream.mockResolvedValue({
            allReady: Promise.resolve(),
        });

        const handleRequest = (await import("./entry.server")).default;
        const request = new Request("https://example.com/", {
            headers: {
                "user-agent": "Googlebot",
            },
        });
        const remixContext = {} as EntryContext;
        const loadContext = {} as AppLoadContext;

        const result = await handleRequest(request, 200, new Headers(), remixContext, loadContext);

        expect(result).toBeInstanceOf(Response);
    });

    test("should handle error in renderToReadableStream", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        mockRenderToReadableStream.mockResolvedValue({
            allReady: Promise.resolve(),
        });

        const handleRequest = (await import("./entry.server")).default;
        const request = new Request("https://example.com/");
        const remixContext = {} as EntryContext;
        const loadContext = {} as AppLoadContext;

        // Mock onError callback
        const mockOnError = vi.fn();
        mockRenderToReadableStream.mockImplementation((element: any, options: any) => {
            if (options?.onError) {
                options.onError(new Error("Render error"));
            }
            return Promise.resolve({
                allReady: Promise.resolve(),
            });
        });

        const result = await handleRequest(request, 200, new Headers(), remixContext, loadContext);

        expect(result).toBeInstanceOf(Response);
        expect(result.status).toBe(500);

        consoleErrorSpy.mockRestore();
    });
});
