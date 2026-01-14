import { Hero } from "./Hero";
import "~/tailwind.css";

export default {
	title: "widgets/hero/Hero",
};

export const Default = () => <Hero tag="h1" highlight="Hello World" />;

export const WithCopy = () => (
	<Hero tag="h1" highlight="Software Engineer" copy="Welcome to my portfolio" />
);

export const H2Tag = () => (
	<Hero tag="h2" highlight="My Projects" copy="Check out what I've built" />
);

export const H3Tag = () => <Hero tag="h3" highlight="About Me" />;

export const WithClassName = () => (
	<Hero
		tag="h1"
		highlight="Styled Hero"
		copy="Custom styling applied"
		className="rounded-lg bg-linear-to-r from-blue-500 to-purple-500 text-white"
	/>
);

export const WithReactElementCopy = () => (
	<Hero
		tag="h1"
		highlight="Creative Developer"
		copy={
			<span className="flex items-center gap-2">
				<span>🚀</span>
				<span>Building the future</span>
			</span>
		}
	/>
);
