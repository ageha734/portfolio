import { describe, expect, test } from "vitest";
import { portfoliosRouter, postsRouter } from "./index";

describe("Router Index", () => {
    test("should export postsRouter", () => {
        expect(postsRouter).toBeDefined();
    });

    test("should export portfoliosRouter", () => {
        expect(portfoliosRouter).toBeDefined();
    });
});
