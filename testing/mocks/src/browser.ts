import { setupWorker } from "msw/browser";
import { trpcHandlers } from "./handlers";

const handlers = [...trpcHandlers];

const worker = setupWorker(...handlers);

if ("window" in globalThis) {
    worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
            url: "/mockServiceWorker.js",
        },
    });
}

export { worker };
export default worker;
