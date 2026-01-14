import { SocialLink } from "./SocialLink";
import "~/tailwind.css";

export default {
	title: "components/SocialLink",
	component: SocialLink,
};

export const Default = () => (
	<SocialLink
		data={{
			icon: "https://via.placeholder.com/14",
			title: "Twitter",
			url: "https://twitter.com/example",
		}}
	/>
);

export const Multiple = () => (
	<div className="flex flex-col gap-2">
		<SocialLink
			data={{
				icon: "https://via.placeholder.com/14",
				title: "Twitter",
				url: "https://twitter.com/example",
			}}
		/>
		<SocialLink
			data={{
				icon: "https://via.placeholder.com/14",
				title: "GitHub",
				url: "https://github.com/example",
			}}
		/>
		<SocialLink
			data={{
				icon: "https://via.placeholder.com/14",
				title: "LinkedIn",
				url: "https://linkedin.com/in/example",
			}}
		/>
	</div>
);
