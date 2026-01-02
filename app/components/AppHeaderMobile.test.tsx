import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AppHeaderMobile } from "./AppHeaderMobile";

describe("AppHeaderMobile Component", () => {
    test("should render mobile header", () => {
        render(
            <MemoryRouter>
                <AppHeaderMobile />
            </MemoryRouter>,
        );

        const logo = screen.getByAltText("Toggle Menu");
        expect(logo).toBeInTheDocument();
    });

    test("should toggle menu when button is clicked", () => {
        render(
            <MemoryRouter>
                <AppHeaderMobile />
            </MemoryRouter>,
        );

        const button = screen.getByTitle("Toggle menu");
        fireEvent.click(button);

        const navLinks = screen.getAllByRole("link");
        expect(navLinks.length).toBeGreaterThan(0);
    });

    test("should render navigation links when menu is open", () => {
        render(
            <MemoryRouter>
                <AppHeaderMobile />
            </MemoryRouter>,
        );

        const button = screen.getByTitle("Toggle menu");
        fireEvent.click(button);

        const aboutLink = screen.getByText("About");
        expect(aboutLink).toBeInTheDocument();
    });
});
