import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://wiki.ageha734.jp",
	integrations: [
		starlight({
			title: "Portfolio Docs",
			defaultLocale: "root",
			locales: {
				root: {
					label: "日本語",
					lang: "ja",
				},
			},
			social: {
				github: "https://github.com/ageha734/portfolio",
			},
			sidebar: [
				{
					label: "Architecture",
					autogenerate: { directory: "architecture" },
				},
				{
					label: "Development",
					autogenerate: { directory: "development" },
				},
				{
					label: "Sequence Diagrams",
					items: [
						{
							label: "Web",
							autogenerate: { directory: "sequence/web" },
						},
						{
							label: "API",
							autogenerate: { directory: "sequence/api" },
						},
					],
				},
				{
					label: "Prompts",
					link: "/prompts/",
				},
			],
			customCss: ["./src/styles/custom.css"],
		}),
	],
});
