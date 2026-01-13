import { expect, test, describe, vi, beforeEach, afterEach } from "vitest";
import { trackSocial } from "./track-social";

describe("tracking", () => {
    const mockGtag = vi.fn();

    beforeEach(() => {
        (globalThis as any).gtag = mockGtag;
    });

    afterEach(() => {
        vi.clearAllMocks();
        delete (globalThis as any).gtag;
    });

    test("should call gtag with view_social event", () => {
        trackSocial("github");

        expect(mockGtag).toHaveBeenCalledWith("event", "view_social", {
            provider: "github",
        });
    });

    test("should not call gtag if gtag is not available", () => {
        delete (globalThis as any).gtag;

        trackSocial("github");

        expect(mockGtag).not.toHaveBeenCalled();
    });

    test("should call gtag with different providers", () => {
        trackSocial("linkedin");
        expect(mockGtag).toHaveBeenCalledWith("event", "view_social", {
            provider: "linkedin",
        });

        trackSocial("twitter");
        expect(mockGtag).toHaveBeenCalledWith("event", "view_social", {
            provider: "twitter",
        });
    });
});
