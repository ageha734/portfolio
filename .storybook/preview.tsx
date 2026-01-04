import type { Preview } from "@storybook/react";
import React, { type ReactNode } from "react";
import { MemoryRouter } from "react-router";
import "~/tailwind.css";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story: () => ReactNode) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default preview;
