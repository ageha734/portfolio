import "@testing-library/jest-dom/vitest";
import type { RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
interface RouterWrapperOptions {
    route?: string;
    initialEntries?: string[];
}
export declare function createRouterWrapper({ route: _route, initialEntries: _initialEntries, }?: RouterWrapperOptions): ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare function renderWithRouter(ui: ReactElement, options?: RenderOptions & RouterWrapperOptions): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export {};
//# sourceMappingURL=render.d.ts.map