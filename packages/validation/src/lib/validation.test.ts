import { describe, expect, test } from "vitest";
import { z } from "zod";
import { validate, validateOrThrow } from "./validation";

describe("validation", () => {
    const testSchema = z.object({
        name: z.string().min(1),
        age: z.number().int().positive(),
    });

    describe("validate", () => {
        test("should return success true with data when validation passes", () => {
            const result = validate(testSchema, {
                name: "John",
                age: 30,
            });

            expect(result.success).toBe(true);
            expect(result.data).toEqual({
                name: "John",
                age: 30,
            });
            expect(result.errors).toBeUndefined();
        });

        test("should return success false with errors when validation fails", () => {
            const result = validate(testSchema, {
                name: "",
                age: -1,
            });

            expect(result.success).toBe(false);
            expect(result.data).toBeUndefined();
            expect(result.errors).toBeDefined();
            expect(result.errors?.issues).toHaveLength(2);
        });

        test("should return success false when data type is invalid", () => {
            const result = validate(testSchema, "invalid");

            expect(result.success).toBe(false);
            expect(result.errors).toBeDefined();
        });
    });

    describe("validateOrThrow", () => {
        test("should return data when validation passes", () => {
            const result = validateOrThrow(testSchema, {
                name: "John",
                age: 30,
            });

            expect(result).toEqual({
                name: "John",
                age: 30,
            });
        });

        test("should throw ZodError when validation fails", () => {
            expect(() => {
                validateOrThrow(testSchema, {
                    name: "",
                    age: -1,
                });
            }).toThrow();
        });
    });
});
