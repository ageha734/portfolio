import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./Button";
import "~/tailwind.css";
export default {
    title: "components/Button",
    component: Button,
};
export const Default = () => _jsx(Button, { children: "Button" });
export const Destructive = () => _jsx(Button, { variant: "destructive", children: "Destructive" });
export const Outline = () => _jsx(Button, { variant: "outline", children: "Outline" });
export const Secondary = () => _jsx(Button, { variant: "secondary", children: "Secondary" });
export const Ghost = () => _jsx(Button, { variant: "ghost", children: "Ghost" });
export const Link = () => _jsx(Button, { variant: "link", children: "Link" });
export const Small = () => _jsx(Button, { size: "sm", children: "Small" });
export const Large = () => _jsx(Button, { size: "lg", children: "Large" });
export const Icon = () => (_jsx(Button, { size: "icon", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("title", { children: "Arrow Right Icon" }), _jsx("path", { d: "M5 12h14" }), _jsx("path", { d: "m12 5 7 7-7 7" })] }) }));
export const Disabled = () => _jsx(Button, { disabled: true, children: "Disabled" });
export const Interactive = () => {
    const [count, setCount] = useState(0);
    return (_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsxs(Button, { onClick: () => setCount(count + 1), children: ["Click me: ", count] }), _jsx(Button, { onClick: () => setCount(0), variant: "outline", children: "Reset" })] }));
};
