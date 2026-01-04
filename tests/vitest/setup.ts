import "@testing-library/jest-dom/vitest";
import "dotenv/config";
import "./env";
import "./mocks";
import "./msw";
import { vi } from "vitest";

// グローバルな @remix-run/react のモック
vi.mock("@remix-run/react", async () => {
    const actual = await vi.importActual("@remix-run/react");
    const { Link: RouterLink } = await import("react-router");

    return {
        ...actual,
        Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => {
            const React = require("react");
            return React.createElement(RouterLink, { to, ...props }, children);
        },
    };
});
