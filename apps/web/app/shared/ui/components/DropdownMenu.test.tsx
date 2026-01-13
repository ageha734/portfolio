import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
} from "./DropdownMenu";

describe("DropdownMenu Component", () => {
    test("should render DropdownMenu with trigger", () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open Menu" });
        expect(trigger).toBeInTheDocument();
    });

    test("should open dropdown menu when trigger is clicked", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const menuItem = await screen.findByText("Item 1");
        expect(menuItem).toBeInTheDocument();
    });

    test("should render DropdownMenuItem", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Menu Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const menuItem = await screen.findByText("Menu Item");
        expect(menuItem).toBeInTheDocument();
    });

    test("should render DropdownMenuLabel", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Label</DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const label = await screen.findByText("Label");
        expect(label).toBeInTheDocument();
    });

    test("should render DropdownMenuSeparator", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Item 2</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const separator = await screen.findByRole("separator");
        expect(separator).toBeInTheDocument();
    });

    test("should render DropdownMenuCheckboxItem", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem checked>Checkbox Item</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const checkboxItem = await screen.findByText("Checkbox Item");
        expect(checkboxItem).toBeInTheDocument();
    });

    test("should render DropdownMenuRadioItem", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="option1">
                        <DropdownMenuRadioItem value="option1">Option 1</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const radioItem = await screen.findByText("Option 1");
        expect(radioItem).toBeInTheDocument();
    });

    test("should apply custom className to DropdownMenuItem", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="custom-item">Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const menuItem = await screen.findByText("Item");
        expect(menuItem).toHaveClass("custom-item");
    });

    test("should render DropdownMenuItem with inset", async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem inset>Inset Item</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        const trigger = screen.getByRole("button", { name: "Open" });
        await user.click(trigger);

        const menuItem = await screen.findByText("Inset Item");
        expect(menuItem).toHaveClass("pl-8");
    });
});
