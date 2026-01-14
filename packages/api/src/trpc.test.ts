import { describe, expect, test } from "vitest";
import { publicProcedure, router } from "./trpc";

describe("tRPC", () => {
    test("should create router", () => {
        const testRouter = router({
            test: publicProcedure.query(() => "test"),
        });

        expect(testRouter).toBeDefined();
    });

    test("should create public procedure", () => {
        const testRouter = router({
            test: publicProcedure.query(() => "test"),
        });

        expect(testRouter).toBeDefined();
    });
});
