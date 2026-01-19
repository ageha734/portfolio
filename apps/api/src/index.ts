import { Hono } from "hono";
import { restRouter } from "./interface/rest";

type Env = {
	DATABASE_URL: string;
	REDIS_URL?: string;
	NODE_ENV: string;
};

const app = new Hono<{ Bindings: Env }>();

app.route("/api", restRouter);

export default app;
