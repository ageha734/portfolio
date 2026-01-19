import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Logo } from "./Logo";
describe("Logo Component", () => {
    test("should render logo", () => {
        const { container } = render(_jsx(Logo, {}));
        const svg = container.querySelector("svg");
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveClass("logo");
    });
    test("should apply custom className", () => {
        const { container } = render(_jsx(Logo, { className: "custom-class" }));
        const svg = container.querySelector("svg");
        expect(svg).toHaveClass("logo", "custom-class");
    });
    test("should apply custom fill", () => {
        const { container } = render(_jsx(Logo, { fill: "#ff0000" }));
        const path = container.querySelector("path");
        expect(path).toHaveAttribute("fill", "#ff0000");
    });
    test("should apply custom height", () => {
        const { container } = render(_jsx(Logo, { height: 100 }));
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("height", "100");
    });
});
