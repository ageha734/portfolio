import { describe, expect, test } from "vitest";
import { assetSchema, enumValueSchema, tagSchema, typeInfoSchema, urlSchema } from "./common";

describe("Common Zod Schemas", () => {
    describe("urlSchema", () => {
        test("should validate valid URL", () => {
            expect(urlSchema.safeParse("https://example.com").success).toBe(true);
        });

        test("should reject invalid URL", () => {
            expect(urlSchema.safeParse("not-a-url").success).toBe(false);
        });
    });

    describe("assetSchema", () => {
        test("should validate asset with valid URL", () => {
            const result = assetSchema.safeParse({ url: "https://example.com/image.jpg" });
            expect(result.success).toBe(true);
        });

        test("should reject asset with invalid URL", () => {
            const result = assetSchema.safeParse({ url: "not-a-url" });
            expect(result.success).toBe(false);
        });
    });

    describe("tagSchema", () => {
        test("should validate tag with name", () => {
            const result = tagSchema.safeParse({ name: "test" });
            expect(result.success).toBe(true);
        });

        test("should reject empty name", () => {
            const result = tagSchema.safeParse({ name: "" });
            expect(result.success).toBe(false);
        });
    });

    describe("enumValueSchema", () => {
        test("should validate enum value with name", () => {
            const result = enumValueSchema.safeParse({ name: "VALUE" });
            expect(result.success).toBe(true);
        });

        test("should reject empty name", () => {
            const result = enumValueSchema.safeParse({ name: "" });
            expect(result.success).toBe(false);
        });
    });

    describe("typeInfoSchema", () => {
        test("should validate type info with enum values", () => {
            const result = typeInfoSchema.safeParse({
                enumValues: [{ name: "VALUE1" }, { name: "VALUE2" }],
            });
            expect(result.success).toBe(true);
        });

        test("should validate type info without enum values", () => {
            const result = typeInfoSchema.safeParse({});
            expect(result.success).toBe(true);
        });
    });
});
