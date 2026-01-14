import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SidebarContent } from "./SidebarContent";

describe("SidebarContent", () => {
    test("should render CMS title", () => {
        const location = { pathname: "/" };
        render(<SidebarContent location={location} />);

        expect(screen.getByText("CMS")).toBeInTheDocument();
    });

    test("should render navigation items", () => {
        const location = { pathname: "/" };
        render(<SidebarContent location={location} />);

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Posts")).toBeInTheDocument();
        expect(screen.getByText("Portfolios")).toBeInTheDocument();
    });

    test("should call onNavigate when link is clicked", () => {
        const location = { pathname: "/" };
        const onNavigate = vi.fn();

        render(<SidebarContent location={location} onNavigate={onNavigate} />);

        const dashboardLink = screen.getByText("Dashboard").closest("a");
        dashboardLink?.click();

        expect(onNavigate).toHaveBeenCalled();
    });

    test("should highlight active navigation item", () => {
        const location = { pathname: "/posts" };
        render(<SidebarContent location={location} />);

        const postsLink = screen.getByText("Posts").closest("a");
        expect(postsLink).toHaveClass("bg-primary");
    });
});
