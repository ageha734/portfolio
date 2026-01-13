import { describe, expect, test } from "vitest";
import { portfoliosRouter } from "./portfolios";

describe("portfoliosRouter", () => {
    test("should have list query", () => {
        expect(portfoliosRouter).toBeDefined();
    });

    test("should have bySlug query", () => {
        expect(portfoliosRouter).toBeDefined();
    });
});
