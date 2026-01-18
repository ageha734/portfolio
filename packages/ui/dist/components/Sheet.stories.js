import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet";
import "~/tailwind.css";
export default {
    title: "components/Sheet",
    component: Sheet,
};
export const Default = () => (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { children: "Open Sheet" }) }), _jsxs(SheetContent, { children: [_jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Sheet Title" }), _jsx(SheetDescription, { children: "This is a sheet description." })] }), _jsx("div", { className: "mt-4", children: _jsx("p", { children: "Sheet content goes here." }) })] })] }));
export const LeftSide = () => (_jsxs(Sheet, { children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { children: "Open Left Sheet" }) }), _jsx(SheetContent, { side: "left", children: _jsxs(SheetHeader, { children: [_jsx(SheetTitle, { children: "Left Sheet" }), _jsx(SheetDescription, { children: "This sheet opens from the left." })] }) })] }));
