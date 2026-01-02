import { expect, test, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header Component", () => {
    test("should render header with logo and navigation links", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Blog")).toBeInTheDocument();
        expect(screen.getByText("Portfolio")).toBeInTheDocument();
        expect(screen.getByText("Resume")).toBeInTheDocument();
        expect(screen.getByText("Uses")).toBeInTheDocument();
    });

    test("should have closed state by default", () => {
        const { container } = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const header = container.querySelector(".header");
        expect(header).toHaveClass("closed");
    });

    test("should toggle menu when toggle button is clicked", () => {
        const { container } = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const toggleButton = screen.getByTitle("Toggle menu");
        const header = container.querySelector(".header");

        expect(header).toHaveClass("closed");

        fireEvent.click(toggleButton);
        expect(header).not.toHaveClass("closed");

        fireEvent.click(toggleButton);
        expect(header).toHaveClass("closed");
    });

    test("should close menu when navigation link is clicked", () => {
        const { container } = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const toggleButton = screen.getByTitle("Toggle menu");
        const aboutLink = screen.getByText("About");
        const header = container.querySelector(".header");

        fireEvent.click(toggleButton);
        expect(header).not.toHaveClass("closed");

        fireEvent.click(aboutLink);
        expect(header).toHaveClass("closed");
    });

    test("should render logo with link to home", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const logoLink = screen.getByText("Home").closest("a");
        expect(logoLink).toHaveAttribute("href", "/");
    });

    test("should have correct navigation links with prefetch", () => {
        render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );

        const aboutLink = screen.getByText("About").closest("a");
        const blogLink = screen.getByText("Blog").closest("a");
        const portfolioLink = screen.getByText("Portfolio").closest("a");
        const resumeLink = screen.getByText("Resume").closest("a");
        const usesLink = screen.getByText("Uses").closest("a");

        expect(aboutLink).toHaveAttribute("href", "/");
        expect(aboutLink).toHaveAttribute("prefetch", "intent");
        expect(blogLink).toHaveAttribute("href", "/blog");
        expect(blogLink).toHaveAttribute("prefetch", "intent");
        expect(portfolioLink).toHaveAttribute("href", "/portfolio");
        expect(portfolioLink).toHaveAttribute("prefetch", "intent");
        expect(resumeLink).toHaveAttribute("href", "/resume");
        expect(resumeLink).toHaveAttribute("prefetch", "intent");
        expect(usesLink).toHaveAttribute("href", "/uses");
        expect(usesLink).toHaveAttribute("prefetch", "intent");
    });
});
