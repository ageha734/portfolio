import { resolve } from "node:path";
import { createStorybookMainPreset } from "@portfolio/storybook-config/main";

const config = createStorybookMainPreset({
    stories: ["../app/**/*.stories.{ts,tsx}"],
    rootDir: resolve(__dirname, ".."),
    additionalAliases: {
        "~": resolve(__dirname, "../app"),
    },
});

export default config;
