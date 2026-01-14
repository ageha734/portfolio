export interface Social {
    icon: string;
    title: string;
    url: string;
}

export interface SocialLinkProps {
    data: Social;
}

export const SocialLink = (props: SocialLinkProps) => {
    const { data } = props;

    const alt = `Follow me on ${data.title}`;
    const size = 14;

    return (
        <a
            className="wrap-break-word flex items-center gap-4 break-all text-color-copy-light text-sm"
            href={data.url}
            key={data.title}
            rel="noopener noreferrer"
            target="_blank"
        >
            <img alt={alt} height={size} src={data.icon} width={size} />
            {data.title}
        </a>
    );
};
