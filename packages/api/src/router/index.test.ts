import { describe, expect, test } from "vitest";
import { postsRouter, portfoliosRouter } from "./index";

describe("Router Index", () => {
    test("should export postsRouter", () => {
        expect(postsRouter).toBeDefined();
    });

    test("should export portfoliosRouter", () => {
        expect(portfoliosRouter).toBeDefined();
    });
});
