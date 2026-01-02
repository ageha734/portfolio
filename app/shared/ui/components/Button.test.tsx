import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, buttonVariants } from "./Button";

describe("Button Component", () => {
    test("should render button with default props", () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole("button", { name: "Click me" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    });

    test("should render button with variant", () => {
        render(<Button variant="destructive">Delete</Button>);

        const button = screen.getByRole("button", { name: "Delete" });
        expect(button).toHaveClass("bg-destructive", "text-destructive-foreground");
    });

    test("should render button with size", () => {
        render(<Button size="lg">Large Button</Button>);

        const button = screen.getByRole("button", { name: "Large Button" });
        expect(button).toHaveClass("h-11", "rounded-md", "px-8");
    });

    test("should render disabled button", () => {
        render(<Button disabled>Disabled</Button>);

        const button = screen.getByRole("button", { name: "Disabled" });
        expect(button).toBeDisabled();
        expect(button).toHaveClass("disabled:pointer-events-none", "disabled:opacity-50");
    });

    test("should handle click events", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(<Button onClick={handleClick}>Click me</Button>);

        const button = screen.getByRole("button", { name: "Click me" });
        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("should not call onClick when disabled", async () => {
        const handleClick = vi.fn();
        const user = userEvent.setup();

        render(
            <Button disabled onClick={handleClick}>
                Disabled
            </Button>,
        );

        const button = screen.getByRole("button", { name: "Disabled" });
        await user.click(button);

        expect(handleClick).not.toHaveBeenCalled();
    });

    test("should apply custom className", () => {
        render(<Button className="custom-class">Custom</Button>);

        const button = screen.getByRole("button", { name: "Custom" });
        expect(button).toHaveClass("custom-class");
    });

    test("should render with all variants", () => {
        const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;

        variants.forEach((variant) => {
            const { unmount } = render(<Button variant={variant}>{variant}</Button>);
            const button = screen.getByRole("button", { name: variant });
            expect(button).toBeInTheDocument();
            unmount();
        });
    });

    test("should render with all sizes", () => {
        const sizes = ["default", "sm", "lg", "icon"] as const;

        sizes.forEach((size) => {
            const { unmount } = render(<Button size={size}>{size}</Button>);
            const button = screen.getByRole("button", { name: size });
            expect(button).toBeInTheDocument();
            unmount();
        });
    });

    test("should render as child component when asChild is true", () => {
        render(
            <Button asChild>
                <a href="/test">Link Button</a>
            </Button>,
        );

        const link = screen.getByRole("link", { name: "Link Button" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/test");
    });

    test("should export buttonVariants", () => {
        expect(buttonVariants).toBeDefined();
        expect(typeof buttonVariants).toBe("function");
    });
});
