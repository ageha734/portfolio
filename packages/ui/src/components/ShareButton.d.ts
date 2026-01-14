export interface ShareOptions {
	url?: string;
	title?: string;
	text?: string;
}

export interface ShareButtonProps {
	url?: string;
	title?: string;
	text?: string;
	className?: string;
	showLabel?: boolean;
	disabled?: boolean;
	onShare: (options: ShareOptions) => void | Promise<void>;
	isAvailable?: boolean;
	iconSrc?: string;
	iconAlt?: string;
}
