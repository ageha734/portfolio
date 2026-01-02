import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogUpcoming } from "./BlogUpcoming";
import type { BlogUpcomingProps } from "./BlogUpcoming";

describe("BlogUpcoming Component", () => {
    let props: BlogUpcomingProps;

    beforeEach(() => {
        props = {
            className: "test-class",
        };
    });

    test("should render upcoming posts section", () => {
        render(<BlogUpcoming {...props} />);

        const heading = screen.getByText("Upcoming Posts");
        expect(heading).toBeInTheDocument();
    });

    test("should render list of upcoming posts", () => {
        render(<BlogUpcoming {...props} />);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBeGreaterThan(0);
    });

    test("should apply custom className", () => {
        const { container } = render(<BlogUpcoming {...props} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.className).toContain("test-class");
    });
});
