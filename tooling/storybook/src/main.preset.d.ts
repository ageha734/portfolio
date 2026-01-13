import type { StorybookConfig } from "@storybook/react-vite";

export interface StorybookMainPresetOptions {
    stories: string[];
    rootDir?: string;
    additionalAliases?: Record<string, string>;
    additionalAddons?: string[];
}

export declare function createStorybookMainPreset(
    options: StorybookMainPresetOptions,
): StorybookConfig;
