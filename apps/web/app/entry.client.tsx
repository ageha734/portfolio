import { RemixBrowser } from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import {
	SENTRY_DSN,
	SENTRY_ENVIRONMENT,
	SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE,
	SENTRY_REPLAY_SAMPLE_RATE,
	SENTRY_TRACES_SAMPLE_RATE,
	XSTATE_INSPECTOR_ENABLED,
} from "~/shared/config/settings";

async function initXStateInspector() {
	if (XSTATE_INSPECTOR_ENABLED) {
		try {
			const module = await import("@xstate/inspect");
			module.inspect({
				iframe: false,
			});
		} catch (error) {
			console.warn("Failed to load XState inspector:", error);
		}
	}
}

if (SENTRY_DSN !== "__undefined__") {
	Sentry.init({
		dsn: SENTRY_DSN,
		environment: SENTRY_ENVIRONMENT,
		tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
		replaysSessionSampleRate: SENTRY_REPLAY_SAMPLE_RATE,
		replaysOnErrorSampleRate: SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE,
		integrations: [Sentry.replayIntegration()],
	});
}

function hydrate() {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RemixBrowser />
			</StrictMode>,
		);
	});
}

initXStateInspector();

if (globalThis.requestIdleCallback) {
	globalThis.requestIdleCallback(hydrate);
} else {
	globalThis.setTimeout(hydrate, 1);
}

if ("serviceWorker" in navigator) {
	globalThis.addEventListener("load", () => {
		navigator.serviceWorker.register("/worker.js");
	});
} else {
	console.warn("Service workers are not supported in this browser.");
}
