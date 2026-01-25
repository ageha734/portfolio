import { jsx as _jsx } from "react/jsx-runtime";
import { MemoryRouter } from "react-router";
export function createStorybookPreviewPreset(options = {}) {
    const { tailwindCssPath, additionalDecorators = [], additionalParameters = {} } = options;
    if (tailwindCssPath) {
        import(tailwindCssPath);
    }
    const preview = {
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
            (Story) => (_jsx(MemoryRouter, { children: _jsx(Story, {}) })),
            ...additionalDecorators,
        ],
    };
    return preview;
}
