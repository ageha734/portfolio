import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    SheetClose,
} from "./Sheet";

describe("Sheet Component", () => {
    test("should render Sheet with trigger and content", () => {
        render(
            <Sheet>
                <SheetTrigger>Open Sheet</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>Sheet description</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>,
        );

        const trigger = screen.getByRole("button", { name: "Open Sheet" });
        expect(trigger).toBeInTheDocument();
    });

    test("should render SheetContent with default side", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <div>Sheet content</div>
                </SheetContent>
            </Sheet>,
        );

        const content = screen.getByText("Sheet content");
        expect(content).toBeInTheDocument();
    });

    test("should render SheetContent with different sides", () => {
        const sides = ["top", "bottom", "left", "right"] as const;

        sides.forEach((side) => {
            const { unmount } = render(
                <Sheet defaultOpen>
                    <SheetContent side={side}>
                        <div>Content from {side}</div>
                    </SheetContent>
                </Sheet>,
            );

            const content = screen.getByText(`Content from ${side}`);
            expect(content).toBeInTheDocument();
            unmount();
        });
    });

    test("should render SheetHeader", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Title</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>,
        );

        const title = screen.getByRole("heading");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Title");
    });

    test("should render SheetTitle", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetTitle>Sheet Title</SheetTitle>
                </SheetContent>
            </Sheet>,
        );

        const title = screen.getByRole("heading");
        expect(title).toHaveTextContent("Sheet Title");
        expect(title).toHaveClass("text-lg", "font-semibold", "text-foreground");
    });

    test("should render SheetDescription", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetDescription>Description text</SheetDescription>
                </SheetContent>
            </Sheet>,
        );

        const description = screen.getByText("Description text");
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });

    test("should render SheetFooter", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetFooter>Footer content</SheetFooter>
                </SheetContent>
            </Sheet>,
        );

        const footer = screen.getByText("Footer content");
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass("flex", "flex-col-reverse", "sm:flex-row", "sm:justify-end", "sm:space-x-2");
    });

    test("should render SheetClose button", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetClose>Close</SheetClose>
                </SheetContent>
            </Sheet>,
        );

        const closeButton = screen.getByRole("button", { name: "Close" });
        expect(closeButton).toBeInTheDocument();
    });

    test("should apply custom className to SheetContent", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent className="custom-sheet">Content</SheetContent>
            </Sheet>,
        );

        const content = screen.getByText("Content");
        expect(content.closest('[role="dialog"]')).toHaveClass("custom-sheet");
    });

    test("should render complete sheet structure", () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Title</SheetTitle>
                        <SheetDescription>Description</SheetDescription>
                    </SheetHeader>
                    <div>Content</div>
                    <SheetFooter>Footer</SheetFooter>
                </SheetContent>
            </Sheet>,
        );

        expect(screen.getByRole("heading")).toHaveTextContent("Title");
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });
});
