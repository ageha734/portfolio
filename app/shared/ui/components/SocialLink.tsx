import type { Social } from "~/entities/user";

export interface SocialLinkProps {
    data: Social;
}

export const SocialLink = (props: SocialLinkProps) => {
    const { data } = props;

    const alt = `Follow me on ${data.title}`;
    const size = 14;

    return (
        <a
            className="flex items-center gap-4 break-words break-all text-color-copy-light text-sm"
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
