import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Button } from "./Button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
describe("Sheet Component", () => {
    test("should render sheet trigger", () => {
        render(_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { children: "Open" }) }), _jsx(SheetContent, { children: _jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Sheet Title" }), _jsx(SheetDescription, { children: "Sheet Description" })] }) })] }));
        expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    });
});
