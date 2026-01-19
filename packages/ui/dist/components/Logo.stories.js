import { jsx as _jsx } from "react/jsx-runtime";
import { Logo } from "./Logo";
import "~/tailwind.css";
export default {
    title: "components/Logo",
    component: Logo,
};
export const Default = () => _jsx(Logo, {});
export const CustomHeight = () => _jsx(Logo, { height: 100 });
export const CustomFill = () => _jsx(Logo, { fill: "#ff0000" });
export const CustomClassName = () => _jsx(Logo, { className: "h-20 w-20" });
