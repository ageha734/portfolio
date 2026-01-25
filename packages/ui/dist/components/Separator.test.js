import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Separator } from "./Separator";
describe("Separator Component", () => {
    test("should render horizontal separator by default", () => {
        const { container } = render(_jsx(Separator, {}));
        const separator = container.firstChild;
        expect(separator).toBeInTheDocument();
        expect(separator).toHaveClass("h-px", "w-full");
    });
    test("should render vertical separator", () => {
        const { container } = render(_jsx(Separator, { orientation: "vertical" }));
        const separator = container.firstChild;
        expect(separator).toHaveClass("h-full", "w-px");
    });
    test("should apply custom className", () => {
        const { container } = render(_jsx(Separator, { className: "custom-class" }));
        const separator = container.firstChild;
        expect(separator).toHaveClass("custom-class");
    });
});
