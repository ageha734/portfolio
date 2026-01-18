import classnames from "classnames";
import { sanitizeHtml } from "~/libs/sanitize";

export interface UserCardProps {
    alt?: string;
    author?: string;
    className?: string;
    copy: string;
    image: string;
}

export const UserCard = (props: UserCardProps) => {
    const { alt, author, className, copy, image } = props;

    const sanitizedCopy = sanitizeHtml(copy);

    return (
        <div className={classnames(className, "flex items-center gap-4")}>
            <img alt={alt} className="h-10 w-10 rounded-full border border-color-border-dark" src={image} />
            <div>
                {author && <h3 className="text-xl">{author}</h3>}
                <div className="font-font-monospace text-xs" dangerouslySetInnerHTML={{ __html: sanitizedCopy }} />
            </div>
        </div>
    );
};
