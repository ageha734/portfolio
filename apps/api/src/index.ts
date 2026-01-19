import { Hono } from "hono";
import { restRouter } from "./interface/rest";
import { initLogger } from "./lib/logger";

type Env = {
	DATABASE_URL: string;
	REDIS_URL?: string;
	NODE_ENV: string;
	SENTRY_DSN?: string;
	APP_VERSION?: string;
};

const app = new Hono<{ Bindings: Env }>();

let initialized = false;

app.use("*", async (c, next) => {
	if (!initialized) {
		initLogger({
			SENTRY_DSN: c.env.SENTRY_DSN,
			NODE_ENV: c.env.NODE_ENV,
			APP_VERSION: c.env.APP_VERSION,
		});
		initialized = true;
	}
	return next();
});

app.get("/health", (c) => {
	return c.json({
		status: "ok",
		version: c.env.APP_VERSION || "unknown",
		environment: c.env.NODE_ENV,
	});
});

app.route("/api", restRouter);

export default app;
