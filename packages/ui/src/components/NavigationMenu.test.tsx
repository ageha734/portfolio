import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "./NavigationMenu";

describe("NavigationMenu Component", () => {
    test("should render navigation menu", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    });
});
