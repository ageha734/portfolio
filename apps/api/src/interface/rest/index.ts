import { Hono } from "hono";
import { getPortfolioBySlug, getPortfolios, uploadPortfolioImage } from "./portfolios";
import { getPostBySlug, getPosts } from "./posts";

export const restRouter = new Hono();

restRouter.get("/posts", getPosts);
restRouter.get("/post/:slug", getPostBySlug);
restRouter.get("/portfolios", getPortfolios);
restRouter.get("/portfolio/:slug", getPortfolioBySlug);
restRouter.post("/portfolios/:portfolioId/images", uploadPortfolioImage);
