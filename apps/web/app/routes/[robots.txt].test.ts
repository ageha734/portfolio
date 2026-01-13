import { expect, test, describe } from "vitest";
import { loader } from "./[robots.txt]";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

describe("[robots.txt] loader", () => {
    test("should generate robots.txt", async () => {
        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result).toBeInstanceOf(Response);
        const text = await result.text();
        expect(text).toContain("User-agent: *");
        expect(text).toContain("Disallow: /api");
        expect(text).toContain("Sitemap:");
    });

    test("should set correct Content-Type header", async () => {
        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result.headers.get("Content-Type")).toBe("text/plain");
    });

    test("should return 200 status", async () => {
        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);

        expect(result.status).toBe(200);
    });

    test("should include sitemap URL", async () => {
        const args = {} as LoaderFunctionArgs;
        const result = await loader(args);
        const text = await result.text();

        expect(text).toContain("/sitemap.xml");
    });
});
