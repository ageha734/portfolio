import { describe, expect, test } from "vitest";
import { z } from "zod";
import { emailSchema } from "./model/schemas";
import { formatValidationError, safeParse } from "./zod";

describe("Validation Utils", () => {
    describe("safeParse", () => {
        const testSchema = z.object({
            name: z.string().min(1),
            age: z.number().min(0),
        });

        test("should return success for valid data", () => {
            const result = safeParse(testSchema, { name: "John", age: 30 });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data).toEqual({ name: "John", age: 30 });
            }
        });

        test("should return error for invalid data", () => {
            const result = safeParse(testSchema, { name: "", age: -1 });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error).toBeInstanceOf(z.ZodError);
            }
        });
    });

    describe("formatValidationError", () => {
        test("should format ZodError to field errors", () => {
            const schema = z.object({
                name: z.string().min(1),
                email: emailSchema,
            });

            const result = schema.safeParse({ name: "", email: "invalid" });

            expect(result.success).toBe(false);
            if (!result.success) {
                const formatted = formatValidationError(result.error);
                expect(formatted).toHaveProperty("name");
                expect(formatted).toHaveProperty("email");
            }
        });

        test("should handle nested field paths", () => {
            const schema = z.object({
                user: z.object({
                    name: z.string().min(1),
                    age: z.number().min(0),
                }),
            });

            const result = schema.safeParse({ user: { name: "", age: -1 } });

            expect(result.success).toBe(false);
            if (!result.success) {
                const formatted = formatValidationError(result.error);
                expect(formatted).toHaveProperty("user.name");
                expect(formatted).toHaveProperty("user.age");
            }
        });

        test("should handle array field paths", () => {
            const schema = z.object({
                items: z.array(z.string().min(1)),
            });

            const result = schema.safeParse({ items: ["", "valid"] });

            expect(result.success).toBe(false);
            if (!result.success) {
                const formatted = formatValidationError(result.error);
                expect(formatted).toHaveProperty("items.0");
            }
        });

        test("should handle multiple errors for same field", () => {
            const schema = z.object({
                email: z
                    .string()
                    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
                        message: "Invalid email format",
                    })
                    .min(10),
            });

            const result = schema.safeParse({ email: "short" });

            expect(result.success).toBe(false);
            if (!result.success) {
                const formatted = formatValidationError(result.error);
                expect(formatted).toHaveProperty("email");
                expect(Array.isArray(formatted.email)).toBe(true);
            }
        });

        test("should handle empty path", () => {
            const schema = z.string().min(1);
            const result = schema.safeParse("");

            expect(result.success).toBe(false);
            if (!result.success) {
                const formatted = formatValidationError(result.error);
                expect(typeof formatted).toBe("object");
            }
        });
    });
});
