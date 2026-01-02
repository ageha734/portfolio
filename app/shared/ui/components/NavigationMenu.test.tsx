import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "./NavigationMenu";

describe("NavigationMenu Component", () => {
    test("should render NavigationMenu", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const link = screen.getByRole("link", { name: "Home" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/");
    });

    test("should render NavigationMenuList", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Item</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const list = screen.getByRole("list");
        expect(list).toBeInTheDocument();
    });

    test("should render NavigationMenuItem", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Item</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const link = screen.getByRole("link", { name: "Item" });
        expect(link).toBeInTheDocument();
    });

    test("should render NavigationMenuTrigger", async () => {
        const user = userEvent.setup();

        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div>Content</div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Trigger" });
        expect(trigger).toBeInTheDocument();

        await user.click(trigger);

        const content = await screen.findByText("Content");
        expect(content).toBeInTheDocument();
    });

    test("should render NavigationMenuContent", async () => {
        const user = userEvent.setup();

        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Open</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div>Menu Content</div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const content = await screen.findByText("Menu Content");
        expect(content).toBeInTheDocument();
    });

    test("should render NavigationMenuLink", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/about">About</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const link = screen.getByRole("link", { name: "About" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/about");
    });

    test("should apply custom className to NavigationMenu", () => {
        render(
            <NavigationMenu className="custom-nav">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Item</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("custom-nav");
    });

    test("should render multiple NavigationMenuItems", () => {
        render(
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/about">About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>,
        );

        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    });
});
