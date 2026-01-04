import type { ReactNode, ComponentProps } from "react";
import { Children } from "react";
import { Link as RouterLink } from "@remix-run/react";
import { cn } from "~/shared/ui/cn";

interface PostHeadingLinkProps {
    id?: string;
}

const PostHeadingLink = ({ id }: PostHeadingLinkProps) => {
    return (
        <RouterLink
            className="absolute -left-6 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
            to={`#${id}`}
            aria-label="Link to heading"
        >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.33333 10.6667H4C2.89543 10.6667 2 9.77124 2 8.66667V4C2 2.89543 2.89543 2 4 2H8.66667C9.77124 2 10.6667 2.89543 10.6667 4V7.33333M8.66667 5.33333H14M14 5.33333V10M14 10H9.33333M9.33333 14H14M14 14V9.33333"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </RouterLink>
    );
};

interface PostHeadingProps extends ComponentProps<"h1"> {
    id?: string;
    children: ReactNode;
}

const PostH1 = ({ children, id, className, ...rest }: PostHeadingProps) => (
    <h1 className={cn("group relative mt-8 mb-4 font-extrabold font-serif text-2xl", className)} id={id} {...rest}>
        <PostHeadingLink id={id} />
        {children}
    </h1>
);

const PostH2 = ({ children, id, className, ...rest }: PostHeadingProps) => (
    <h2 className={cn("group relative mt-8 mb-4 font-extrabold font-serif text-xl", className)} id={id} {...rest}>
        <PostHeadingLink id={id} />
        {children}
    </h2>
);

const PostH3 = ({ children, id, className, ...rest }: PostHeadingProps) => (
    <h3 className={cn("group relative mt-8 mb-4 font-extrabold font-serif text-lg", className)} id={id} {...rest}>
        <PostHeadingLink id={id} />
        {children}
    </h3>
);

const PostH4 = ({ children, id, className, ...rest }: PostHeadingProps) => (
    <h4 className={cn("group relative mt-8 mb-4 font-extrabold font-serif text-base", className)} id={id} {...rest}>
        <PostHeadingLink id={id} />
        {children}
    </h4>
);

interface PostParagraphProps extends ComponentProps<"p"> {
    children: ReactNode;
}

const PostParagraph = ({ children, className, ...rest }: PostParagraphProps) => {
    const hasSingleChild = Children.count(children) === 1;
    const firstChild = Children.toArray(children)[0] as { type?: typeof PostImage };

    if (hasSingleChild && firstChild?.type === PostImage) {
        return <>{children}</>;
    }

    return (
        <p className={cn("mb-4 leading-relaxed", className)} {...rest}>
            {children}
        </p>
    );
};

const PostLink = (props: ComponentProps<"a">) => <RouterLink to={props.href || ""} {...props} />;

const PostUl = (props: ComponentProps<"ul">) => {
    return <ul className={cn("mb-4 list-disc pl-8", props.className)} {...props} />;
};

const PostOl = (props: ComponentProps<"ol">) => {
    return <ol className={cn("mb-4 list-decimal pl-8", props.className)} {...props} />;
};

interface PostLiProps extends ComponentProps<"li"> {
    children: ReactNode;
}

const PostLi = ({ children, ...props }: PostLiProps) => {
    return <li {...props}>{children}</li>;
};

interface PostCodeProps extends ComponentProps<"code"> {
    children: ReactNode;
}

const PostCode = ({ children, className, ...rest }: PostCodeProps) => (
    <code className={cn("rounded bg-muted px-1.5 py-0.5 font-mono text-sm", className)} {...rest}>
        {children}
    </code>
);

interface PostPreProps extends ComponentProps<"pre"> {
    children: ReactNode;
}

const PostPre = ({ children, className, ...rest }: PostPreProps) => {
    return (
        <div className="my-4 overflow-auto rounded-lg bg-muted p-4">
            <pre className={cn("font-mono text-sm", className)} {...rest}>
                {children}
            </pre>
        </div>
    );
};

const PostBlockquote = (props: ComponentProps<"blockquote">) => {
    return <blockquote className="my-8 border-primary border-l-4 pl-4 text-muted-foreground italic" {...props} />;
};

const PostHr = (props: ComponentProps<"hr">) => {
    return <hr className="my-8 border-border border-t" {...props} />;
};

const PostStrong = (props: ComponentProps<"strong">) => {
    return <strong className="font-semibold" {...props} />;
};

interface PostImageProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
}

const PostImage = ({ src, alt, width, height, ...rest }: PostImageProps & ComponentProps<"img">) => {
    return (
        <img
            className="mb-4 h-auto w-full rounded-lg"
            src={src}
            loading="lazy"
            alt={alt}
            width={width}
            height={height}
            {...rest}
        />
    );
};

interface EmbedProps {
    src: string;
}

const Embed = ({ src }: EmbedProps) => {
    return (
        <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
            <iframe src={src} loading="lazy" title="Embed" className="h-full w-full" />
        </div>
    );
};

export const PostMarkdown = {
    h1: PostH1,
    h2: PostH2,
    h3: PostH3,
    h4: PostH4,
    p: PostParagraph,
    a: PostLink,
    ul: PostUl,
    ol: PostOl,
    li: PostLi,
    pre: PostPre,
    code: PostCode,
    blockquote: PostBlockquote,
    hr: PostHr,
    img: PostImage,
    strong: PostStrong,
    Embed,
};
