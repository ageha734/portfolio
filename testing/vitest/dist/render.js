import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
export function createRouterWrapper({ route: _route = "/", initialEntries: _initialEntries, } = {}) {
    return function Wrapper({ children }) {
        return _jsx("div", { "data-testid": "router-wrapper", children: children });
    };
}
export function renderWithRouter(ui, options = {}) {
    const { route, initialEntries, ...renderOptions } = options;
    const wrapper = createRouterWrapper({ route, initialEntries });
    return render(ui, { wrapper, ...renderOptions });
}
