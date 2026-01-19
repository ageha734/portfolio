import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
describe("Card Component", () => {
    test("should render card with content", () => {
        render(_jsx(Card, { children: _jsx(CardContent, { children: "Card content" }) }));
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });
    test("should render card with header", () => {
        render(_jsx(Card, { children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Card Title" }), _jsx(CardDescription, { children: "Card Description" })] }) }));
        expect(screen.getByText("Card Title")).toBeInTheDocument();
        expect(screen.getByText("Card Description")).toBeInTheDocument();
    });
    test("should render card with footer", () => {
        render(_jsxs(Card, { children: [_jsx(CardContent, { children: "Content" }), _jsx(CardFooter, { children: "Footer" })] }));
        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
    test("should apply custom className", () => {
        const { container } = render(_jsx(Card, { className: "custom-class", children: "Content" }));
        const card = container.firstChild;
        expect(card).toHaveClass("custom-class");
    });
});
