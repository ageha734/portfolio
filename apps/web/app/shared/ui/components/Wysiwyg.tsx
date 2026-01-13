import * as React from "react";
import Prism from "prismjs";
import "prismjs/plugins/line-numbers/prism-line-numbers";

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
    }, [content]);

    return (
        <div className="wysiwyg" ref={wysiwygRef} dangerouslySetInnerHTML={{ __html: content }} />
    );
};
