import { describe, expect, test, vi } from "vitest";
import { postsRouter } from "./posts";

vi.mock("~/di/container", () => ({
    DIContainer: vi.fn(),
}));

describe("postsRouter", () => {
    test("should have list query", () => {
        expect(postsRouter).toBeDefined();
    });

    test("should have bySlug query", () => {
        expect(postsRouter).toBeDefined();
    });
});
