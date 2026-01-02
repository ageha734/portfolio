import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

describe("Footer Component", () => {
    test("should render footer with social links", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.getByAltText("Follow me on LinkedIn")).toBeInTheDocument();
        expect(screen.getByAltText("Follow me on GitHub")).toBeInTheDocument();
        expect(screen.getByAltText("Follow me on Twitter")).toBeInTheDocument();
    });

    test("should render footer text", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Built with/)).toBeInTheDocument();
        expect(screen.getByText(/San Diego/)).toBeInTheDocument();
    });

    test("should not render footer on resume page", () => {
        render(
            <MemoryRouter initialEntries={["/resume"]}>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.queryByAltText("Follow me on LinkedIn")).not.toBeInTheDocument();
        expect(screen.queryByText(/Built with/)).not.toBeInTheDocument();
    });

    test("should render footer on non-resume pages", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.getByAltText("Follow me on LinkedIn")).toBeInTheDocument();
    });

    test("should have correct social link attributes", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>,
        );

        const linkedinLink = screen.getByAltText("Follow me on LinkedIn").closest("a");
        const githubLink = screen.getByAltText("Follow me on GitHub").closest("a");
        const twitterLink = screen.getByAltText("Follow me on Twitter").closest("a");

        expect(linkedinLink).toHaveAttribute("target", "_blank");
        expect(linkedinLink).toHaveAttribute("rel", "noreferrer");
        expect(githubLink).toHaveAttribute("target", "_blank");
        expect(githubLink).toHaveAttribute("rel", "noreferrer");
        expect(twitterLink).toHaveAttribute("target", "_blank");
        expect(twitterLink).toHaveAttribute("rel", "noreferrer");
    });

    test("should not render footer on resume sub-pages", () => {
        render(
            <MemoryRouter initialEntries={["/resume/something"]}>
                <Footer />
            </MemoryRouter>,
        );

        expect(screen.queryByAltText("Follow me on LinkedIn")).not.toBeInTheDocument();
    });
});
