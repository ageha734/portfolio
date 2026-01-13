import { type RenderOptions, render as rtlRender } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { createMemoryRouter, RouterProvider } from "react-router";

interface WrapperOptions {
    route?: string;
    initialEntries?: string[];
}

export function renderWithRouter(ui: ReactElement, options?: Omit<RenderOptions, "wrapper"> & WrapperOptions) {
    const route: string = options?.route ?? "/";
    const initialEntries: string[] = options?.initialEntries ?? [route];
    const { route: _r, initialEntries: _i, ...renderOptions } = options ?? {};

    const router = createMemoryRouter(
        [
            {
                path: "*",
                element: ui,
            },
        ],
        {
            initialEntries,
        },
    );

    return {
        ...rtlRender(<RouterProvider router={router} />, renderOptions),
        router,
    };
}

export function createRouterWrapper(options?: WrapperOptions) {
    const route: string = options?.route ?? "/";
    const initialEntries: string[] = options?.initialEntries ?? [route];

    return function RouterWrapper({ children }: { children: ReactNode }) {
        const router = createMemoryRouter(
            [
                {
                    path: "*",
                    element: children,
                },
            ],
            {
                initialEntries,
            },
        );

        return <RouterProvider router={router} />;
    };
}

export { rtlRender as render };
