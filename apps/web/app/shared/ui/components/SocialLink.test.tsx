import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialLink } from "./SocialLink";
import type { SocialLinkProps } from "./SocialLink";

describe("SocialLink Component", () => {
    const mockSocial: SocialLinkProps["data"] = {
        icon: "/images/svg/github.svg",
        title: "visormatt",
        url: "https://github.com/visormatt",
    };

    test("should render social link", () => {
        render(<SocialLink data={mockSocial} />);

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", mockSocial.url);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    test("should render social icon", () => {
        render(<SocialLink data={mockSocial} />);

        const image = screen.getByAltText(`Follow me on ${mockSocial.title}`);
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockSocial.icon);
        expect(image).toHaveAttribute("height", "14");
        expect(image).toHaveAttribute("width", "14");
    });

    test("should render social title", () => {
        render(<SocialLink data={mockSocial} />);

        expect(screen.getByText(mockSocial.title)).toBeInTheDocument();
    });

    test("should have correct className", () => {
        const { container } = render(<SocialLink data={mockSocial} />);

        const link = container.querySelector("a");
        expect(link).toHaveClass(
            "flex",
            "items-center",
            "gap-4",
            "break-words",
            "break-all",
            "text-sm",
            "text-color-copy-light",
        );
    });
});
