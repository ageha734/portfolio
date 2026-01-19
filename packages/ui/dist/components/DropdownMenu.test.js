import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./DropdownMenu";
describe("DropdownMenu Component", () => {
    test("should render dropdown menu trigger", () => {
        render(_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { children: "Open" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Settings" })] })] }));
        expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    });
});
