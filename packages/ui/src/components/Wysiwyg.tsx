import Prism from "prismjs";
import * as React from "react";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import { sanitizeHtml } from "../utils/sanitize";

export interface WysiwygProps {
    content: string;
}

export const Wysiwyg = (props: WysiwygProps) => {
    const { content } = props;
    const wysiwygRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (wysiwygRef.current) {
            Prism.highlightAllUnder(wysiwygRef.current);
        }
    }, []);

    const sanitizedContent = sanitizeHtml(content);

    return <div className="wysiwyg" ref={wysiwygRef} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
