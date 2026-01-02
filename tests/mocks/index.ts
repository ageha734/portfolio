import { setupServer } from "msw/node";
import { graphcmsHandlers } from "./graphcms";

const server = setupServer(...graphcmsHandlers);

server.listen({ onUnhandledRequest: "bypass" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());

export { server };
export { graphcmsHandlers } from "./graphcms";
