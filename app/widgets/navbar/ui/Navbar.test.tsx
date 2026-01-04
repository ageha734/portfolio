import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./navbar";

vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    return {
        ...actual,
        useFetcher: () => ({
            formData: null,
            submit: vi.fn(),
        }),
        useLoaderData: () => ({
            canonicalUrl: "https://example.com",
            theme: "dark",
        }),
        useLocation: () => ({
            pathname: "/",
            hash: "",
            key: "test",
        }),
    };
});

describe("Navbar Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = "";
    });

    test("should render navbar", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        expect(screen.getByLabelText("Matthew Scholta, Software Engineer")).toBeInTheDocument();
    });

    test("should render navigation links", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        expect(screen.getByText("Projects")).toBeInTheDocument();
        expect(screen.getByText("Details")).toBeInTheDocument();
        expect(screen.getByText("Articles")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    test("should render monogram logo", () => {
        const { container } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const logoLink = container.querySelector(`[aria-label="Matthew Scholta, Software Engineer"]`);
        expect(logoLink).toBeInTheDocument();
        const svg = logoLink?.querySelector("svg");
        expect(svg).toBeInTheDocument();
    });

    test("should toggle mobile menu", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const toggleButton = screen.getByLabelText("Menu");
        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);

        const mobileNav = document.querySelector('[data-visible="true"]');
        expect(mobileNav).toBeInTheDocument();
    });

    test("should close mobile menu when link is clicked", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const toggleButton = screen.getByLabelText("Menu");
        fireEvent.click(toggleButton);

        const projectsLink = screen.getByText("Projects");
        fireEvent.click(projectsLink);

        const mobileNav = document.querySelector('[data-visible="true"]');
        expect(mobileNav).not.toBeInTheDocument();
    });

    test("should render social links", () => {
        const { container } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const socialLinks = container.querySelectorAll("[data-navbar-item]");
        expect(socialLinks.length).toBeGreaterThan(0);
    });

    test("should handle nav item click with hash", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
            </MemoryRouter>,
        );

        const projectsLink = screen.getByText("Projects").closest("a");
        expect(projectsLink).toHaveAttribute("href", "/#project-1");
    });

    test("should set aria-current for active link", () => {
        render(
            <MemoryRouter initialEntries={["/#project-1"]}>
                <Navbar />
            </MemoryRouter>,
        );

        const projectsLink = screen.getByText("Projects").closest("a");
        expect(projectsLink).toHaveAttribute("aria-current", "page");
    });
});
