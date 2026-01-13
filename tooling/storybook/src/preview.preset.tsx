import type { Preview } from "@storybook/react";
import React, { type ReactNode } from "react";
import { MemoryRouter } from "react-router";

export interface StorybookPreviewPresetOptions {
    tailwindCssPath?: string;
    additionalDecorators?: Array<(Story: () => ReactNode) => ReactNode>;
    additionalParameters?: Preview["parameters"];
}

export function createStorybookPreviewPreset(options: StorybookPreviewPresetOptions = {}): Preview {
    const { tailwindCssPath, additionalDecorators = [], additionalParameters = {} } = options;

    if (tailwindCssPath) {
        import(tailwindCssPath);
    }

    const preview: Preview = {
        parameters: {
            actions: { argTypesRegex: "^on[A-Z].*" },
            controls: {
                matchers: {
                    color: /(background|color)$/i,
                    date: /Date$/i,
                },
            },
            ...additionalParameters,
        },
        decorators: [
            (Story: () => ReactNode) => (
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            ),
            ...additionalDecorators,
        ],
    };

    return preview;
}
