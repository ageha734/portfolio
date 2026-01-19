import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./NavigationMenu";
describe("NavigationMenu Component", () => {
    test("should render navigation menu", () => {
        render(_jsx(NavigationMenu, { children: _jsx(NavigationMenuList, { children: _jsx(NavigationMenuItem, { children: _jsx(NavigationMenuLink, { href: "/", children: "Home" }) }) }) }));
        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    });
});
