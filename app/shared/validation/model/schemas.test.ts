import { expect, test, describe } from "vitest";
import { slugSchema, urlSchema, emailSchema } from "./schemas";

describe("Validation Schemas", () => {
    describe("slugSchema", () => {
        test("should accept valid slug", () => {
            const validSlugs = ["test", "test-slug", "test123", "123-test", "a-b-c-123"];

            for (const slug of validSlugs) {
                const result = slugSchema.safeParse(slug);
                expect(result.success).toBe(true);
                if (result.success) {
                    expect(result.data).toBe(slug);
                }
            }
        });

        test("should reject invalid slug", () => {
            const invalidSlugs = [
                "",
                "Test",
                "test_slug",
                "test slug",
                "test@slug",
                "test.slug",
                "test/slug",
                "TEST-SLUG",
            ];

            for (const slug of invalidSlugs) {
                const result = slugSchema.safeParse(slug);
                expect(result.success).toBe(false);
            }
        });

        test("should reject empty string", () => {
            const result = slugSchema.safeParse("");
            expect(result.success).toBe(false);
        });
    });

    describe("urlSchema", () => {
        test("should accept valid URLs", () => {
            const validUrls = [
                "https://example.com",
                "http://example.com",
                "https://example.com/path",
                "https://example.com/path?query=value",
                "https://example.com:8080/path",
            ];

            for (const url of validUrls) {
                const result = urlSchema.safeParse(url);
                expect(result.success).toBe(true);
                if (result.success) {
                    expect(result.data).toBe(url);
                }
            }
        });

        test("should reject invalid URLs", () => {
            const invalidUrls = ["", "not-a-url", "example.com", "ftp://example.com", "javascript:alert(1)"];

            for (const url of invalidUrls) {
                const result = urlSchema.safeParse(url);
                expect(result.success).toBe(false);
            }
        });
    });

    describe("emailSchema", () => {
        test("should accept valid email addresses", () => {
            const validEmails = [
                "test@example.com",
                "user.name@example.com",
                "user+tag@example.co.uk",
                "user123@example-domain.com",
            ];

            for (const email of validEmails) {
                const result = emailSchema.safeParse(email);
                expect(result.success).toBe(true);
                if (result.success) {
                    expect(result.data).toBe(email);
                }
            }
        });

        test("should reject invalid email addresses", () => {
            const invalidEmails = [
                "",
                "not-an-email",
                "@example.com",
                "user@",
                "user@example",
                "user name@example.com",
                "user@example .com",
            ];

            for (const email of invalidEmails) {
                const result = emailSchema.safeParse(email);
                expect(result.success).toBe(false);
            }
        });

        test("should reject empty string", () => {
            const result = emailSchema.safeParse("");
            expect(result.success).toBe(false);
        });
    });
});
