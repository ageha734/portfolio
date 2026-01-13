import { expect, test, describe } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
    test("should merge class names", () => {
        const result = cn("foo", "bar");
        expect(result).toBe("foo bar");
    });

    test("should handle conditional classes", () => {
        const result = cn("foo", false && "bar", "baz");
        expect(result).toBe("foo baz");
    });

    test("should merge tailwind classes correctly", () => {
        const result = cn("px-2 py-1", "px-4");
        expect(result).toBe("py-1 px-4");
    });

    test("should handle empty strings", () => {
        const result = cn("foo", "", "bar");
        expect(result).toBe("foo bar");
    });

    test("should handle undefined and null", () => {
        const result = cn("foo", undefined, null, "bar");
        expect(result).toBe("foo bar");
    });

    test("should handle arrays", () => {
        const result = cn(["foo", "bar"], "baz");
        expect(result).toBe("foo bar baz");
    });

    test("should handle objects", () => {
        const result = cn({ foo: true, bar: false, baz: true });
        expect(result).toBe("foo baz");
    });

    test("should handle mixed inputs", () => {
        const result = cn("foo", ["bar", "baz"], { qux: true, quux: false });
        expect(result).toBe("foo bar baz qux");
    });

    test("should return empty string for no inputs", () => {
        const result = cn();
        expect(result).toBe("");
    });

    test("should handle complex tailwind merge scenarios", () => {
        const result = cn("p-4 p-2", "m-2 m-4");
        expect(result).toBe("p-2 m-4");
    });
});
