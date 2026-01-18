import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@portfolio/ui";
export const ShareButton = ({ url, title, text, className, showLabel = false, disabled = false, onShare, isAvailable = true, iconSrc = "/images/svg/share.svg", iconAlt = "Share", }) => {
    if (!isAvailable)
        return null;
    const handleClick = () => {
        if (disabled || !onShare)
            return;
        onShare({ url, title, text });
    };
    return (_jsxs("button", { type: "button", className: cn("ui-btn custom-bg-gradient whitespace-nowrap rounded-2xl px-4 py-2 font-normal text-sm text-white", disabled && "cursor-not-allowed opacity-50", className), onClick: handleClick, disabled: disabled, children: [_jsx("img", { alt: iconAlt, height: 20, src: iconSrc, width: 20 }), showLabel && _jsx("span", { children: "Share" })] }));
};
