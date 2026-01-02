import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

describe("Card Component", () => {
    test("should render Card with default props", () => {
        render(<Card>Card content</Card>);

        const card = screen.getByText("Card content");
        expect(card).toBeInTheDocument();
        expect(card).toHaveClass("rounded-lg", "border", "bg-card", "text-card-foreground", "shadow-sm");
    });

    test("should apply custom className to Card", () => {
        render(<Card className="custom-card">Content</Card>);

        const card = screen.getByText("Content");
        expect(card).toHaveClass("custom-card");
    });

    test("should render CardHeader", () => {
        render(
            <Card>
                <CardHeader>Header content</CardHeader>
            </Card>,
        );

        const header = screen.getByText("Header content");
        expect(header).toBeInTheDocument();
        expect(header).toHaveClass("flex", "flex-col", "space-y-1.5", "p-6");
    });

    test("should render CardTitle", () => {
        render(
            <Card>
                <CardTitle>Card Title</CardTitle>
            </Card>,
        );

        const title = screen.getByRole("heading", { level: 3 });
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Card Title");
        expect(title).toHaveClass("text-2xl", "font-semibold", "leading-none", "tracking-tight");
    });

    test("should render CardDescription", () => {
        render(
            <Card>
                <CardDescription>Card description text</CardDescription>
            </Card>,
        );

        const description = screen.getByText("Card description text");
        expect(description).toBeInTheDocument();
        expect(description.tagName).toBe("P");
        expect(description).toHaveClass("text-sm", "text-muted-foreground");
    });

    test("should render CardContent", () => {
        render(
            <Card>
                <CardContent>Card content text</CardContent>
            </Card>,
        );

        const content = screen.getByText("Card content text");
        expect(content).toBeInTheDocument();
        expect(content).toHaveClass("p-6", "pt-0");
    });

    test("should render CardFooter", () => {
        render(
            <Card>
                <CardFooter>Footer content</CardFooter>
            </Card>,
        );

        const footer = screen.getByText("Footer content");
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveClass("flex", "items-center", "p-6", "pt-0");
    });

    test("should render complete card structure", () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Title</CardTitle>
                    <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>,
        );

        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Title");
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    test("should apply custom className to CardHeader", () => {
        render(
            <Card>
                <CardHeader className="custom-header">Header</CardHeader>
            </Card>,
        );

        const header = screen.getByText("Header");
        expect(header).toHaveClass("custom-header");
    });

    test("should apply custom className to CardTitle", () => {
        render(
            <Card>
                <CardTitle className="custom-title">Title</CardTitle>
            </Card>,
        );

        const title = screen.getByRole("heading", { level: 3 });
        expect(title).toHaveClass("custom-title");
    });
});
