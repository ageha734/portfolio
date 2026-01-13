import { type SetupServerApi, setupServer } from "msw/node";
import { trpcHandlers } from "./handlers";

const handlers = [...trpcHandlers];

export const server: SetupServerApi = setupServer(...handlers);

if (typeof process !== "undefined") {
    server.listen({ onUnhandledRequest: "bypass" });

    process.once("SIGINT", () => {
        server.close();
    });

    process.once("SIGTERM", () => {
        server.close();
    });
}

export { server as default };
