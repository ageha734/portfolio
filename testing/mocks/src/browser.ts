import { type SetupWorkerApi, setupWorker } from "msw/browser";
import { trpcHandlers } from "./handlers";

const handlers = [...trpcHandlers];

export const worker: SetupWorkerApi = setupWorker(...handlers);

if (typeof window !== "undefined") {
    worker.start({
        onUnhandledRequest: "bypass",
        serviceWorker: {
            url: "/mockServiceWorker.js",
        },
    });
}

export { worker as default };
