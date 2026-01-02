import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import { usePageTracking } from "./usePageTracking";

const mockGtag = vi.fn();
beforeEach(() => {
    (globalThis as unknown as Window).gtag = mockGtag;
});

afterEach(() => {
    vi.clearAllMocks();
});

const Wrapper = ({ children }: { children: ReactNode }) => {
    return <MemoryRouter initialEntries={["/test"]}>{children}</MemoryRouter>;
};

describe("usePageTracking", () => {
    test("should call gtag with page_view event", () => {
        renderHook(() => usePageTracking(), {
            wrapper: Wrapper,
        });

        expect(mockGtag).toHaveBeenCalledWith("event", "page_view", {
            page_location: expect.stringContaining("/test"),
        });
    });

    test("should not call gtag if window.gtag is not available", () => {
        delete (globalThis as unknown as Window).gtag;

        renderHook(() => usePageTracking(), {
            wrapper: Wrapper,
        });

        expect(mockGtag).not.toHaveBeenCalled();
    });
});
