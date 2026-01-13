import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Tags } from "./Tags";

describe("Tags Component", () => {
    const mockTags: string[] = ["TypeScript", "React", "Node.js"];

    test("should render tags", () => {
        render(<Tags tags={mockTags} />);

        mockTags.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });

    test("should render heading when provided", () => {
        render(<Tags tags={mockTags} heading="Technologies" />);

        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Technologies");
    });

    test("should not render heading when not provided", () => {
        const { container } = render(<Tags tags={mockTags} />);

        const heading = container.querySelector("h2");
        expect(heading).not.toBeInTheDocument();
    });

    test("should apply custom className", () => {
        const { container } = render(<Tags tags={mockTags} className="custom-container" />);

        const containerDiv = container.firstChild as HTMLElement;
        expect(containerDiv).toHaveClass("custom-container");
    });

    test("should apply custom classNameTag", () => {
        const { container } = render(<Tags tags={mockTags} classNameTag="custom-tag" />);

        const customTagElements = container.querySelectorAll(".custom-tag");
        expect(customTagElements.length).toBeGreaterThan(0);
    });

    test("should render tags in flex wrap container", () => {
        const { container } = render(<Tags tags={mockTags} />);

        const flexContainer = container.querySelector(".flex.flex-wrap.gap-2");
        expect(flexContainer).toBeInTheDocument();
    });

    test("should use tag as key", () => {
        render(<Tags tags={mockTags} />);

        // 各タグが表示されていることを確認
        mockTags.forEach((tag) => {
            expect(screen.getByText(tag)).toBeInTheDocument();
        });
    });
});
