import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Route } from "./__root";

describe("Root Route", () => {
    test("should render root component", () => {
        render(<Route.component />);
        expect(screen.getByText("Root")).toBeInTheDocument();
    });
});
