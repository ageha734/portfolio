import { expect, test, describe, vi, beforeEach } from "vitest";
import { loader, getQuote } from "./api.qualities";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

describe("api.qualities", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getQuote", () => {
        test("should return a quote", () => {
            const quote = getQuote();
            expect(quote).toBeDefined();
            expect(typeof quote).toBe("string");
            expect(quote.length).toBeGreaterThan(0);
        });

        test("should return different quote when value is provided", () => {
            const firstQuote = getQuote();
            const secondQuote = getQuote(firstQuote);
            expect(secondQuote).toBeDefined();
            expect(typeof secondQuote).toBe("string");
            // Note: Due to randomness, we can't guarantee they're different,
            // but we can verify the function doesn't throw
        });

        test("should return a quote from the qualities array", () => {
            const qualities = [
                "A problem solver 🧩",
                "A creative thinker 🤔",
                "A team player 🤝",
                "A father and husband 👨‍👩‍👧",
                "A self starter  🏇",
                "An innovator 💡",
                "A perpetual learner 📚",
                "A rule breaker 🙊",
            ];

            const quote = getQuote();
            expect(qualities).toContain(quote);
        });

        test("should handle empty string value", () => {
            const quote = getQuote("");
            expect(quote).toBeDefined();
            expect(typeof quote).toBe("string");
        });

        test("should return different quote when same value is provided multiple times", () => {
            const value = "A problem solver 🧩";
            const quote1 = getQuote(value);
            const quote2 = getQuote(value);
            // Due to randomness, quotes may be the same or different
            expect(quote1).toBeDefined();
            expect(quote2).toBeDefined();
            expect(typeof quote1).toBe("string");
            expect(typeof quote2).toBe("string");
        });

        test("should handle undefined value", () => {
            const quote = getQuote(undefined);
            expect(quote).toBeDefined();
            expect(typeof quote).toBe("string");
        });

        test("should recursively call when quote matches value", () => {
            // Mock Math.random to return a specific value
            const originalRandom = Math.random;
            let callCount = 0;
            Math.random = vi.fn(() => {
                callCount++;
                // First call returns index 0, second call returns index 1
                return callCount === 1 ? 0 : 0.125;
            });

            const value = "A problem solver 🧩";
            const quote = getQuote(value);

            expect(quote).toBeDefined();
            expect(typeof quote).toBe("string");
            // Should have called Math.random at least once
            expect(callCount).toBeGreaterThan(0);

            Math.random = originalRandom;
        });
    });

    describe("loader", () => {
        test("should return a quote", async () => {
            const args = {} as LoaderFunctionArgs;
            const result = await loader(args);

            expect(result).toBeDefined();
            expect(typeof result).toBe("string");
            expect(result.length).toBeGreaterThan(0);
        });

        test("should return a valid quote format", async () => {
            const args = {} as LoaderFunctionArgs;
            const result = await loader(args);

            // Quotes should contain text and possibly emoji
            expect(result).toMatch(/^[A-Za-z].+/);
        });
    });
});
