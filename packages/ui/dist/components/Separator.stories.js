import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "./Separator";
import "~/tailwind.css";
export default {
    title: "components/Separator",
    component: Separator,
};
export const Horizontal = () => (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: "Content above" }), _jsx(Separator, {}), _jsx("div", { children: "Content below" })] }));
export const Vertical = () => (_jsxs("div", { className: "flex h-20 items-center gap-4", children: [_jsx("div", { children: "Left" }), _jsx(Separator, { orientation: "vertical" }), _jsx("div", { children: "Right" })] }));
