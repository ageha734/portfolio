import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tags } from "./Tags";
import type { TagsProps } from "./Tags";

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

        const tagElements = container.querySelectorAll("div > div");
        tagElements.forEach((tag) => {
            expect(tag).toHaveClass("custom-tag");
        });
    });

    test("should render tags in flex wrap container", () => {
        const { container } = render(<Tags tags={mockTags} />);

        const flexContainer = container.querySelector(".flex.flex-wrap.gap-2");
        expect(flexContainer).toBeInTheDocument();
    });

    test("should use tag as key", () => {
        const { container } = render(<Tags tags={mockTags} />);

        const tagElements = container.querySelectorAll("div > div");
        expect(tagElements).toHaveLength(mockTags.length);
    });
});
