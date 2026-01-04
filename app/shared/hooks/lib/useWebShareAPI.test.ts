import { expect, test, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useWebShareAPI } from "./useWebShareAPI";

describe("useWebShareAPI", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("should return isAvailable as true when navigator.share exists", () => {
        Object.defineProperty(navigator, "share", {
            value: vi.fn(),
            writable: true,
        });

        const { result } = renderHook(() => useWebShareAPI());

        expect(result.current.isAvailable).toBe(true);
    });

    test("should return isAvailable as false when navigator.share does not exist", () => {
        delete (navigator as any).share;

        const { result } = renderHook(() => useWebShareAPI());

        expect(result.current.isAvailable).toBe(false);
    });

    test("should call navigator.share when onShare is called", async () => {
        const mockShare = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "share", {
            value: mockShare,
            writable: true,
        });

        const { result } = renderHook(() => useWebShareAPI());

        await result.current.onShare("https://example.com");

        expect(mockShare).toHaveBeenCalledWith(
            expect.objectContaining({
                url: "https://example.com",
            }),
        );
    });

    test("should call gtag when share succeeds", async () => {
        const mockShare = vi.fn().mockResolvedValue(undefined);
        const mockGtag = vi.fn();
        Object.defineProperty(navigator, "share", {
            value: mockShare,
            writable: true,
        });
        (globalThis as unknown as Window).gtag = mockGtag;

        const { result } = renderHook(() => useWebShareAPI());

        await result.current.onShare("https://example.com");

        expect(mockGtag).toHaveBeenCalledWith("event", "share", {
            method: "Web Share",
        });
    });

    test("should not call gtag when gtag is not available", async () => {
        const mockShare = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, "share", {
            value: mockShare,
            writable: true,
        });
        (globalThis as unknown as Window).gtag = undefined;

        const { result } = renderHook(() => useWebShareAPI());

        await result.current.onShare("https://example.com");

        expect(mockShare).toHaveBeenCalled();
    });

    test("should handle share error gracefully", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {
            // Suppress console.error output during test
        });
        const mockShare = vi.fn().mockRejectedValue(new Error("Share failed"));
        Object.defineProperty(navigator, "share", {
            value: mockShare,
            writable: true,
        });

        const { result } = renderHook(() => useWebShareAPI());

        await result.current.onShare("https://example.com");

        expect(consoleErrorSpy).toHaveBeenCalledWith("Web Share error", expect.any(Error));

        consoleErrorSpy.mockRestore();
    });

    test("should not call navigator.share when not available", async () => {
        delete (navigator as any).share;

        const { result } = renderHook(() => useWebShareAPI());

        await result.current.onShare("https://example.com");

        // Should not throw error
        expect(result.current.isAvailable).toBe(false);
    });
});
