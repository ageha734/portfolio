import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SocialLink } from "./SocialLink";
import "~/tailwind.css";
export default {
    title: "components/SocialLink",
    component: SocialLink,
};
export const Default = () => (_jsx(SocialLink, { data: {
        icon: "https://via.placeholder.com/14",
        title: "Twitter",
        url: "https://twitter.com/example",
    } }));
export const Multiple = () => (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(SocialLink, { data: {
                icon: "https://via.placeholder.com/14",
                title: "Twitter",
                url: "https://twitter.com/example",
            } }), _jsx(SocialLink, { data: {
                icon: "https://via.placeholder.com/14",
                title: "GitHub",
                url: "https://github.com/example",
            } }), _jsx(SocialLink, { data: {
                icon: "https://via.placeholder.com/14",
                title: "LinkedIn",
                url: "https://linkedin.com/in/example",
            } })] }));
