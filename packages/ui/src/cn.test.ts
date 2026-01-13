import { describe, expect, test } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
    test("should merge class names", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    test("should handle conditional classes", () => {
        expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
    });

    test("should merge Tailwind classes correctly", () => {
        expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    });

    test("should handle empty strings", () => {
        expect(cn("foo", "", "bar")).toBe("foo bar");
    });

    test("should handle undefined and null", () => {
        expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
    });
});
