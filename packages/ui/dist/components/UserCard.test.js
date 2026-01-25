import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { UserCard } from "./UserCard";
vi.mock("../libs/sanitize.js", () => ({
    sanitizeHtml: vi.fn((html) => html),
}));
describe("UserCard Component", () => {
    const mockProps = {
        copy: "Test user description",
        image: "https://example.com/avatar.jpg",
        alt: "User avatar",
        author: "John Doe",
    };
    test("should render user card", () => {
        render(_jsx(UserCard, { ...mockProps }));
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Test user description")).toBeInTheDocument();
    });
    test("should render image with alt text", () => {
        render(_jsx(UserCard, { ...mockProps }));
        const img = screen.getByAltText("User avatar");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", mockProps.image);
    });
    test("should render without author", () => {
        render(_jsx(UserCard, { copy: mockProps.copy, image: mockProps.image }));
        expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
        expect(screen.getByText("Test user description")).toBeInTheDocument();
    });
    test("should apply custom className", () => {
        const { container } = render(_jsx(UserCard, { className: "custom-class", ...mockProps }));
        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass("custom-class");
    });
});
