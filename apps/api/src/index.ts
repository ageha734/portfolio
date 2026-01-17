import type { D1Database } from "@cloudflare/workers-types";
import { Hono } from "hono";
import { restRouter } from "./interface/rest";

type Env = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.route("/api", restRouter);

export default app;
