import { describe, expect, test } from "vitest";
import {
    errorLocationSchema,
    errorResponseSchema,
    graphQLErrorSchema,
    graphQLRequestSchema,
    graphQLResponseSchema,
} from "./graphql";

describe("GraphQL Schemas", () => {
    describe("errorLocationSchema", () => {
        test("should validate valid error location", () => {
            const result = errorLocationSchema.safeParse({
                line: 1,
                column: 5,
            });
            expect(result.success).toBe(true);
        });

        test("should reject invalid error location", () => {
            const result = errorLocationSchema.safeParse({
                line: "1",
                column: 5,
            });
            expect(result.success).toBe(false);
        });
    });

    describe("graphQLErrorSchema", () => {
        test("should validate GraphQL error with message", () => {
            const result = graphQLErrorSchema.safeParse({
                message: "Error message",
            });
            expect(result.success).toBe(true);
        });

        test("should validate GraphQL error with locations", () => {
            const result = graphQLErrorSchema.safeParse({
                message: "Error message",
                locations: [{ line: 1, column: 5 }],
            });
            expect(result.success).toBe(true);
        });

        test("should validate GraphQL error with path", () => {
            const result = graphQLErrorSchema.safeParse({
                message: "Error message",
                path: ["field", "subfield"],
            });
            expect(result.success).toBe(true);
        });

        test("should reject GraphQL error without message", () => {
            const result = graphQLErrorSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });

    describe("graphQLRequestSchema", () => {
        test("should validate GraphQL request with query", () => {
            const result = graphQLRequestSchema.safeParse({
                query: "{ posts { id } }",
            });
            expect(result.success).toBe(true);
        });

        test("should validate GraphQL request with variables", () => {
            const result = graphQLRequestSchema.safeParse({
                query: "{ post(slug: $slug) { id } }",
                variables: { slug: "test-post" },
            });
            expect(result.success).toBe(true);
        });

        test("should reject GraphQL request without query", () => {
            const result = graphQLRequestSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });

    describe("graphQLResponseSchema", () => {
        test("should validate GraphQL response with data", () => {
            const result = graphQLResponseSchema.safeParse({
                data: { posts: [] },
            });
            expect(result.success).toBe(true);
        });

        test("should validate GraphQL response with errors", () => {
            const result = graphQLResponseSchema.safeParse({
                errors: [{ message: "Error message" }],
            });
            expect(result.success).toBe(true);
        });

        test("should validate empty GraphQL response", () => {
            const result = graphQLResponseSchema.safeParse({});
            expect(result.success).toBe(true);
        });
    });

    describe("errorResponseSchema", () => {
        test("should validate error response with message", () => {
            const result = errorResponseSchema.safeParse({
                message: "Error message",
            });
            expect(result.success).toBe(true);
        });

        test("should validate error response with errors", () => {
            const result = errorResponseSchema.safeParse({
                message: "Error message",
                errors: [{ message: "GraphQL error" }],
            });
            expect(result.success).toBe(true);
        });

        test("should reject error response without message", () => {
            const result = errorResponseSchema.safeParse({});
            expect(result.success).toBe(false);
        });
    });
});
