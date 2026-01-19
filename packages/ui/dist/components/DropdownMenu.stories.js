import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./DropdownMenu";
import "~/tailwind.css";
export default {
    title: "components/DropdownMenu",
    component: DropdownMenu,
};
export const Default = () => (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { children: "Open Menu" }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Profile" }), _jsx(DropdownMenuItem, { children: "Settings" }), _jsx(DropdownMenuItem, { children: "Logout" })] })] }));
