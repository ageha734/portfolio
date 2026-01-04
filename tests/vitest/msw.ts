import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks";

beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
    vi.clearAllMocks();
});

afterAll(() => {
    server.close();
});
