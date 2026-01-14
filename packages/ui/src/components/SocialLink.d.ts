export interface Social {
	icon: string;
	title: string;
	url: string;
}

export interface SocialLinkProps {
	data: Social;
}

export declare const SocialLink: (props: SocialLinkProps) => JSX.Element;
