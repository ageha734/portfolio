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
});
