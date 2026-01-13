import type { Preview } from "@storybook/react";
import type { ReactNode } from "react";

export interface StorybookPreviewPresetOptions {
    tailwindCssPath?: string;
    additionalDecorators?: Array<(Story: () => ReactNode) => ReactNode>;
    additionalParameters?: Preview["parameters"];
}

export declare function createStorybookPreviewPreset(
    options?: StorybookPreviewPresetOptions,
): Preview;
