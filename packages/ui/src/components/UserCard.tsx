import classnames from "classnames";

export interface UserCardProps {
	alt?: string;
	author?: string;
	className?: string;
	copy: string;
	image: string;
}

export const UserCard = (props: UserCardProps) => {
	const { alt, author, className, copy, image } = props;

	return (
		<div className={classnames(className, "flex items-center gap-4")}>
			<img
				alt={alt}
				className="h-10 w-10 rounded-full border border-color-border-dark"
				src={image}
			/>
			<div>
				{author && <h3 className="text-xl">{author}</h3>}
				<div
					className="font-font-monospace text-xs"
					// biome-ignore lint: UserCardコンポーネントはHTMLコンテンツを表示するために必要
					dangerouslySetInnerHTML={{ __html: copy }}
				/>
			</div>
		</div>
	);
};
