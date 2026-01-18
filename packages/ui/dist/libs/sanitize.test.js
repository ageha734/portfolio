import { describe, expect, test } from "vitest";
import { sanitizeHtml } from "./sanitize";
describe("sanitizeHtml", () => {
    test("should sanitize HTML and keep allowed tags", () => {
        const html = "<p>Hello <strong>world</strong></p>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<p>");
        expect(result).toContain("<strong>");
        expect(result).toContain("Hello");
        expect(result).toContain("world");
    });
    test("should remove script tags", () => {
        const html = "<p>Hello</p><script>alert('xss')</script>";
        const result = sanitizeHtml(html);
        expect(result).not.toContain("<script>");
        expect(result).not.toContain("alert");
        expect(result).toContain("<p>Hello</p>");
    });
    test("should remove event handlers", () => {
        const html = "<p onclick=\"alert('xss')\">Hello</p>";
        const result = sanitizeHtml(html);
        expect(result).not.toContain("onclick");
        expect(result).toContain("<p>Hello</p>");
    });
    test("should keep allowed attributes", () => {
        const html = '<a href="https://example.com" title="Link">Link</a>';
        const result = sanitizeHtml(html);
        expect(result).toContain('href="https://example.com"');
        expect(result).toContain('title="Link"');
        expect(result).toContain("Link");
    });
    test("should keep img tags with allowed attributes", () => {
        const html = '<img src="https://example.com/image.jpg" alt="Image" />';
        const result = sanitizeHtml(html);
        expect(result).toContain("<img");
        expect(result).toContain('src="https://example.com/image.jpg"');
        expect(result).toContain('alt="Image"');
    });
    test("should remove data attributes when ALLOW_DATA_ATTR is false", () => {
        const html = '<p data-testid="test">Hello</p>';
        const result = sanitizeHtml(html);
        expect(result).not.toContain("data-testid");
        expect(result).toContain("<p>Hello</p>");
    });
    test("should handle empty string", () => {
        const result = sanitizeHtml("");
        expect(result).toBe("");
    });
    test("should handle plain text", () => {
        const result = sanitizeHtml("Hello world");
        expect(result).toBe("Hello world");
    });
    test("should keep allowed heading tags", () => {
        const html = "<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<h1>Title</h1>");
        expect(result).toContain("<h2>Subtitle</h2>");
        expect(result).toContain("<h3>Section</h3>");
    });
    test("should keep list tags", () => {
        const html = "<ul><li>Item 1</li><li>Item 2</li></ul>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<ul>");
        expect(result).toContain("<li>Item 1</li>");
        expect(result).toContain("<li>Item 2</li>");
    });
    test("should keep code and pre tags", () => {
        const html = "<pre><code>console.log('hello')</code></pre>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<pre>");
        expect(result).toContain("<code>");
        expect(result).toContain("console.log");
    });
    test("should keep table tags", () => {
        const html = "<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Cell</td></tr></tbody></table>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<table>");
        expect(result).toContain("<thead>");
        expect(result).toContain("<tbody>");
        expect(result).toContain("<tr>");
        expect(result).toContain("<th>Header</th>");
        expect(result).toContain("<td>Cell</td>");
    });
    test("should keep blockquote tags", () => {
        const html = "<blockquote>Quote text</blockquote>";
        const result = sanitizeHtml(html);
        expect(result).toContain("<blockquote>Quote text</blockquote>");
    });
    test("should remove style attributes", () => {
        const html = '<p style="color: red;">Hello</p>';
        const result = sanitizeHtml(html);
        expect(result).not.toContain("style");
        expect(result).toContain("<p>Hello</p>");
    });
    test("should keep target and rel attributes on links", () => {
        const html = '<a href="https://example.com" target="_blank" rel="noreferrer">Link</a>';
        const result = sanitizeHtml(html);
        expect(result).toContain('target="_blank"');
        expect(result).toContain('rel="noreferrer"');
    });
});
