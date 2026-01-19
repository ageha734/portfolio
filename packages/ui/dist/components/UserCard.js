import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { sanitizeHtml } from "../libs/sanitize.js";
export const UserCard = (props) => {
    const { alt, author, className, copy, image } = props;
    const sanitizedCopy = sanitizeHtml(copy);
    return (_jsxs("div", { className: classnames(className, "flex items-center gap-4"), children: [_jsx("img", { alt: alt, className: "h-10 w-10 rounded-full border border-color-border-dark", src: image }), _jsxs("div", { children: [author && _jsx("h3", { className: "text-xl", children: author }), _jsx("div", { className: "font-font-monospace text-xs", dangerouslySetInnerHTML: { __html: sanitizedCopy } })] })] }));
};
