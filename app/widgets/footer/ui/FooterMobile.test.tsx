import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FooterMobile } from "./FooterMobile";

describe("FooterMobile Component", () => {
    test("should render footer mobile with social links", () => {
        render(
            <MemoryRouter>
                <FooterMobile />
            </MemoryRouter>,
        );

        expect(screen.getByAltText("Follow me on LinkedIn")).toBeInTheDocument();
        expect(screen.getByAltText("Follow me on GitHub")).toBeInTheDocument();
        expect(screen.getByAltText("Follow me on Twitter")).toBeInTheDocument();
    });

    test("should render footer mobile text", () => {
        render(
            <MemoryRouter>
                <FooterMobile />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Built with/)).toBeInTheDocument();
        expect(screen.getByText(/San Diego/)).toBeInTheDocument();
    });

    test("should not render footer mobile on resume page", () => {
        render(
            <MemoryRouter initialEntries={["/resume"]}>
                <FooterMobile />
            </MemoryRouter>,
        );

        expect(screen.queryByAltText("Follow me on LinkedIn")).not.toBeInTheDocument();
        expect(screen.queryByText(/Built with/)).not.toBeInTheDocument();
    });

    test("should render footer mobile on non-resume pages", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <FooterMobile />
            </MemoryRouter>,
        );

        expect(screen.getByAltText("Follow me on LinkedIn")).toBeInTheDocument();
    });

    test("should have correct social link attributes", () => {
        render(
            <MemoryRouter>
                <FooterMobile />
            </MemoryRouter>,
        );

        const linkedInLink = screen.getByAltText("Follow me on LinkedIn").closest("a");
        const githubLink = screen.getByAltText("Follow me on GitHub").closest("a");
        const twitterLink = screen.getByAltText("Follow me on Twitter").closest("a");

        expect(linkedInLink).toHaveAttribute("target", "_blank");
        expect(linkedInLink).toHaveAttribute("rel", "noreferrer");
        expect(githubLink).toHaveAttribute("target", "_blank");
        expect(githubLink).toHaveAttribute("rel", "noreferrer");
        expect(twitterLink).toHaveAttribute("target", "_blank");
        expect(twitterLink).toHaveAttribute("rel", "noreferrer");
    });

    test("should have md:hidden class for mobile-only display", () => {
        const { container } = render(
            <MemoryRouter>
                <FooterMobile />
            </MemoryRouter>,
        );

        const footer = container.querySelector("footer");
        expect(footer).toHaveClass("md:hidden");
    });
});
