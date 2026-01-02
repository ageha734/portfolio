/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { AppLoadContext, EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import * as Sentry from "@sentry/remix";
import {
    SENTRY_DSN,
    SENTRY_ENVIRONMENT,
    SENTRY_TRACES_SAMPLE_RATE,
} from "~/shared/config/settings";

if (SENTRY_DSN !== "__undefined__") {
    Sentry.init({
        dsn: SENTRY_DSN,
        environment: SENTRY_ENVIRONMENT,
        tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
    });
}

async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext,
    loadContext: AppLoadContext,
) {
    let statusCode = responseStatusCode;
    const body = await renderToReadableStream(<RemixServer context={remixContext} url={request.url} />, {
        signal: request.signal,
        onError(error: unknown) {
            console.error(error);
            if (SENTRY_DSN !== "__undefined__") {
                Sentry.captureException(error);
            }
            statusCode = 500;
        },
    });

    if (isbot(request.headers.get("user-agent") || "")) {
        await body.allReady;
    }

    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
        headers: responseHeaders,
        status: statusCode,
    });
}

export default handleRequest;
