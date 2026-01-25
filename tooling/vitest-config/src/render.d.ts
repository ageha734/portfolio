import type { RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import type { createMemoryRouter } from "react-router";

interface WrapperOptions {
    route?: string;
    initialEntries?: string[];
}

export interface RenderWithRouterResult extends ReturnType<typeof import("@testing-library/react").render> {
    router: ReturnType<typeof createMemoryRouter>;
}

export declare function renderWithRouter(
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper"> & WrapperOptions,
): RenderWithRouterResult;

export declare function createRouterWrapper(
    options?: WrapperOptions,
): ({ children }: { children: ReactNode }) => JSX.Element;

export declare function render(
    ui: ReactElement,
    options?: RenderOptions,
): ReturnType<typeof import("@testing-library/react").render>;
