import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";
import "~/tailwind.css";
export default {
    title: "components/Card",
    component: Card,
};
export const Default = () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Card Title" }), _jsx(CardDescription, { children: "Card Description" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Card content goes here." }) }), _jsx(CardFooter, { children: _jsx(Button, { children: "Action" }) })] }));
export const Simple = () => (_jsx(Card, { children: _jsx(CardContent, { children: _jsx("p", { children: "Simple card with just content." }) }) }));
export const WithHeader = () => (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Card with Header" }), _jsx(CardDescription, { children: "This card has a header section" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Content section" }) })] }));
