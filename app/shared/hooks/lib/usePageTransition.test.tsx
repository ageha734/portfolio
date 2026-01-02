import { expect, test, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { usePageTransition } from "./usePageTransition";

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <MemoryRouter>{children}</MemoryRouter>;
};

describe("usePageTransition", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        globalThis.fetch = vi.fn();
    });

    test("should return transition function", () => {
        const { result } = renderHook(() => usePageTransition(), {
            wrapper: Wrapper,
        });

        expect(result.current.transition).toBeDefined();
        expect(typeof result.current.transition).toBe("function");
    });
});
