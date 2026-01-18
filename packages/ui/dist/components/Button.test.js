import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Button } from "./Button";
describe("Button Component", () => {
    test("should render button with default props", () => {
        render(_jsx(Button, { children: "Click me" }));
        const button = screen.getByRole("button", { name: "Click me" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });
    test("should render button with variant", () => {
        render(_jsx(Button, { variant: "destructive", children: "Delete" }));
        const button = screen.getByRole("button", { name: "Delete" });
        expect(button).toHaveClass("bg-destructive", "text-destructive-foreground");
    });
    test("should render button with size", () => {
        render(_jsx(Button, { size: "lg", children: "Large Button" }));
        const button = screen.getByRole("button", { name: "Large Button" });
        expect(button).toHaveClass("h-11", "rounded-md", "px-8");
    });
    test("should render disabled button", () => {
        render(_jsx(Button, { disabled: true, children: "Disabled" }));
        const button = screen.getByRole("button", { name: "Disabled" });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
    });
    test("should handle click events", () => {
        const handleClick = vi.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Click me" }));
        const button = screen.getByRole("button", { name: "Click me" });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test("should not call onClick when disabled", () => {
        const handleClick = vi.fn();
        render(_jsx(Button, { disabled: true, onClick: handleClick, children: "Disabled" }));
        const button = screen.getByRole("button", { name: "Disabled" });
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
    test("should render all variants", () => {
        const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"];
        variants.forEach((variant) => {
            const { unmount } = render(_jsx(Button, { variant: variant, children: variant }));
            const button = screen.getByRole("button", { name: variant });
            expect(button).toBeInTheDocument();
            unmount();
        });
    });
    test("should render all sizes", () => {
        const sizes = ["default", "sm", "lg", "icon"];
        sizes.forEach((size) => {
            const { unmount } = render(_jsx(Button, { size: size, children: size }));
            const button = screen.getByRole("button", { name: size });
            expect(button).toBeInTheDocument();
            unmount();
        });
    });
});
