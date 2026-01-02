import { expect, test, describe, vi, beforeEach } from "vitest";
import {
    BASE_URL,
    GOOGLE_ANALYTICS,
    GOOGLE_TAG_MANAGER,
    GRAPHCMS_ADMIN,
    GRAPHCMS_TOKEN,
    GRAPHCMS_URL,
} from "./settings";

describe("settings", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();
        process.env = { ...originalEnv };
    });

    test("should export BASE_URL with fallback", () => {
        expect(BASE_URL).toBeTruthy();
        expect(typeof BASE_URL).toBe("string");
    });

    test("should export GOOGLE_ANALYTICS with fallback", () => {
        expect(GOOGLE_ANALYTICS).toBeTruthy();
        expect(typeof GOOGLE_ANALYTICS).toBe("string");
    });

    test("should export GOOGLE_TAG_MANAGER with fallback", () => {
        expect(GOOGLE_TAG_MANAGER).toBeTruthy();
        expect(typeof GOOGLE_TAG_MANAGER).toBe("string");
    });

    test("should export GRAPHCMS_ADMIN with fallback", () => {
        expect(GRAPHCMS_ADMIN).toBeTruthy();
        expect(typeof GRAPHCMS_ADMIN).toBe("string");
    });

    test("should export GRAPHCMS_TOKEN with fallback", () => {
        expect(GRAPHCMS_TOKEN).toBeTruthy();
        expect(typeof GRAPHCMS_TOKEN).toBe("string");
    });

    test("should export GRAPHCMS_URL with fallback", () => {
        expect(GRAPHCMS_URL).toBeTruthy();
        expect(typeof GRAPHCMS_URL).toBe("string");
    });
});
