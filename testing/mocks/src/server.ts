import { type SetupServerApi, setupServer } from "msw/node";
import { trpcHandlers } from "./handlers";

const handlers = [...trpcHandlers];

const server: SetupServerApi = setupServer(...handlers);

if (typeof process !== "undefined") {
    server.listen({ onUnhandledRequest: "bypass" });

    process.once("SIGINT", () => {
        server.close();
    });

    process.once("SIGTERM", () => {
        server.close();
    });
}

export default server;
