import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		react(),
		TanStackRouterVite({
			routesDirectory: "./app/routes",
			generatedRouteTree: "./app/routeTree.gen.tsx",
			routeFileIgnorePattern: ".test.",
		}),
		tsconfigPaths({
			ignoreConfigErrors: true,
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"~": resolve(__dirname, "./app"),
		},
	},
});
