import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Wysiwyg } from "./Wysiwyg";
vi.mock("prismjs", () => ({
    default: {
        highlightAllUnder: vi.fn(),
    },
}));
describe("Wysiwyg Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    test("should render HTML content", () => {
        const content = "<p>Test content</p>";
        const { container } = render(_jsx(Wysiwyg, { content: content }));
        const wysiwyg = container.querySelector(".wysiwyg");
        expect(wysiwyg).toBeInTheDocument();
        expect(wysiwyg?.innerHTML).toBe(content);
    });
    test("should apply wysiwyg class", () => {
        const { container } = render(_jsx(Wysiwyg, { content: "<p>Test</p>" }));
        const wysiwyg = container.querySelector(".wysiwyg");
        expect(wysiwyg).toBeInTheDocument();
    });
    test("should handle complex HTML", () => {
        const content = "<div><h1>Title</h1><p>Paragraph</p></div>";
        const { container } = render(_jsx(Wysiwyg, { content: content }));
        const wysiwyg = container.querySelector(".wysiwyg");
        expect(wysiwyg?.innerHTML).toBe(content);
    });
});
