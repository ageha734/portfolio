import Prism from "prismjs";
import * as React from "react";
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
    }, []);

    return (
        <div
            className="wysiwyg"
            ref={wysiwygRef}
            // biome-ignore lint: WYSIWYGコンポーネントはHTMLコンテンツを表示するために必要
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};
