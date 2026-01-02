import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { SandboxSidebar } from "./SandboxSidebar";

describe("SandboxSidebar Component", () => {
    test("should render sandbox sidebar", () => {
        render(<SandboxSidebar />);

        expect(screen.getByText("🔗 Sandbox Sidebar")).toBeInTheDocument();
    });

    test("should render with default className", () => {
        const { container } = render(<SandboxSidebar />);

        const sidebar = container.querySelector(".p-4");
        expect(sidebar).toBeInTheDocument();
    });

    test("should apply custom className", () => {
        const { container } = render(<SandboxSidebar className="custom-class" />);

        const sidebar = container.querySelector(".p-4");
        expect(sidebar).toHaveClass("custom-class");
    });

    test("should render heading", () => {
        render(<SandboxSidebar />);

        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading).toHaveTextContent("🔗 Sandbox Sidebar");
    });
});
