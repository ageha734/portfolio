import { jsx as _jsx } from "react/jsx-runtime";
import Prism from "prismjs";
import * as React from "react";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { sanitizeHtml } from "../libs/sanitize.js";
export const Wysiwyg = (props) => {
    const { content } = props;
    const wysiwygRef = React.useRef(null);
    React.useEffect(() => {
        if (wysiwygRef.current) {
            Prism.highlightAllUnder(wysiwygRef.current);
        }
    }, []);
    const sanitizedContent = sanitizeHtml(content);
    return _jsx("div", { className: "wysiwyg", ref: wysiwygRef, dangerouslySetInnerHTML: { __html: sanitizedContent } });
};
