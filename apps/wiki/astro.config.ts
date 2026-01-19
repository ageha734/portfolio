import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { AstroIntegration } from "astro";

function copyStaticAssets(): AstroIntegration {
	return {
		name: "copy-static-assets",
		hooks: {
			"astro:build:done": ({ dir }) => {
				const outDir = dir.pathname;
				const uiDesignPath = resolve("design/ui");
				if (existsSync(uiDesignPath)) {
					cpSync(uiDesignPath, resolve(outDir, "design"), {
						recursive: true,
					});
				}
				const webDesignPath = resolve("design/web");
				if (existsSync(webDesignPath)) {
					cpSync(webDesignPath, resolve(outDir, "storybook"), {
						recursive: true,
					});
				}
				cpSync(resolve("reference"), resolve(outDir, "reference"), {
					recursive: true,
				});
			},
		},
	};
}

export default defineConfig({
	site: "https://wiki.ageha734.jp",
	output: "static",
	adapter: cloudflare(),
	integrations: [
		react(),
		mermaid({
			theme: "default",
			autoTheme: true,
		}),
		copyStaticAssets(),
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
					label: "Database",
					autogenerate: { directory: "database" },
				},
				{
					label: "Prompts",
					link: "/prompts/",
				},
				{
					label: "References",
					items: [
						{
							label: "API Reference",
							link: "/reference/",
							attrs: { target: "_blank" },
						},
						{
							label: "UI Components",
							link: "/design/",
							attrs: { target: "_blank" },
						},
						{
							label: "Web Storybook",
							link: "/storybook/",
							attrs: { target: "_blank" },
						},
					],
				},
			],
			customCss: ["./src/styles/custom.css"],
		}),
	],
});
