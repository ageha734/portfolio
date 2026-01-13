import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SITE_AUTHOR } from "~/shared/config/constants";
import type { UserCardProps } from "./UserCard";
import { UserCard } from "./UserCard";

describe("UserCard Component", () => {
    const mockProps: UserCardProps = {
        alt: "User avatar",
        copy: "Software Engineer",
        image: "https://example.com/avatar.jpg",
    };

    test("should render user card", () => {
        render(<UserCard {...mockProps} />);

        expect(screen.getByText(SITE_AUTHOR)).toBeInTheDocument();
    });

    test("should render user image", () => {
        render(<UserCard {...mockProps} />);

        const image = screen.getByAltText(mockProps.alt!);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockProps.image);
        expect(image).toHaveClass("h-10", "w-10", "rounded-full", "border", "border-color-border-dark");
    });

    test("should render user copy with HTML", () => {
        const { container } = render(<UserCard {...mockProps} />);

        const copyElement = container.querySelector(".font-font-monospace");
        expect(copyElement).toBeInTheDocument();
        expect(copyElement).toHaveTextContent(mockProps.copy);
    });

    test("should apply custom className", () => {
        const { container } = render(<UserCard {...mockProps} className="custom-card" />);

        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass("flex", "items-center", "gap-4", "custom-card");
    });

    test("should render without alt text", () => {
        const propsWithoutAlt: UserCardProps = {
            copy: mockProps.copy,
            image: mockProps.image,
        };

        render(<UserCard {...propsWithoutAlt} />);

        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
        // altがない場合、属性自体が存在しないか空文字列
        const altValue = image.getAttribute("alt");
        expect(altValue === null || altValue === "").toBe(true);
    });

    test("should render author name", () => {
        render(<UserCard {...mockProps} />);

        const authorName = screen.getByText(SITE_AUTHOR);
        expect(authorName).toBeInTheDocument();
        expect(authorName.tagName).toBe("H3");
        expect(authorName).toHaveClass("text-xl");
    });
});
