import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SocialLink = (props) => {
    const { data } = props;
    const alt = `Follow me on ${data.title}`;
    const size = 14;
    return (_jsxs("a", { className: "wrap-break-word flex items-center gap-4 break-all text-color-copy-light text-sm", href: data.url, rel: "noopener noreferrer", target: "_blank", children: [_jsx("img", { alt: alt, height: size, src: data.icon, width: size }), data.title] }, data.title));
};
