import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Route } from "./index";

describe("Index Route", () => {
    test("should render admin dashboard", () => {
        render(<Route.component />);
        expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    });
});
