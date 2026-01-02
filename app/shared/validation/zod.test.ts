import { expect, test, describe } from "vitest";
import { z } from "zod";
import { safeParse, formatValidationError } from "./zod";
import { emailSchema } from "./model/schemas";

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
    });
});
