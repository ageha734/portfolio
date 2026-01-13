import { expect, test, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { usePageTransition } from "./usePageTransition";

const mockNavigate = vi.fn();

vi.mock("@remix-run/react", () => ({
    useNavigate: () => mockNavigate,
}));

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <MemoryRouter>{children}</MemoryRouter>;
};

describe("usePageTransition", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        globalThis.fetch = vi.fn().mockResolvedValue(new Response());
        (globalThis.window as any) = globalThis;
        (document as any).createDocumentTransition = undefined;
    });

    test("should return transition function", () => {
        const { result } = renderHook(() => usePageTransition(), {
            wrapper: Wrapper,
        });

        expect(result.current.transition).toBeDefined();
        expect(typeof result.current.transition).toBe("function");
    });

    test("should call fetch with correct URL", async () => {
        const { result } = renderHook(() => usePageTransition(), {
            wrapper: Wrapper,
        });

        await result.current.transition("/test");

        expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining("/test"));
    });

    test("should navigate when document transition is not supported", async () => {
        (document as any).createDocumentTransition = undefined;

        const { result } = renderHook(() => usePageTransition(), {
            wrapper: Wrapper,
        });

        await result.current.transition("/test");

        expect(mockNavigate).toHaveBeenCalledWith("/test");
    });

    test("should use document transition when supported", async () => {
        const mockStart = vi.fn().mockResolvedValue(undefined);
        (document as any).createDocumentTransition = vi.fn(() => ({
            start: mockStart,
        }));

        const { result } = renderHook(() => usePageTransition(), {
            wrapper: Wrapper,
        });

        await result.current.transition("/test");

        expect(mockStart).toHaveBeenCalled();
    });
});
