// src/browser.ts
import { setupWorker } from "msw/browser";

// src/handlers/rest.ts
import { HttpResponse, http } from "msw";
var API_URL = process.env.API_URL || "http://localhost:8787";
var mockPosts = [
  {
    id: "1",
    title: "Test Post 1",
    slug: "test-post-1",
    date: new Date("2024-01-01").toISOString(),
    description: "Test description",
    content: "<p>Test content</p>",
    imageTemp: "test-image.jpg",
    sticky: false,
    intro: "Test intro",
    tags: ["test", "blog"],
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-01-01").toISOString()
  }
];
var mockPortfolios = [
  {
    id: "1",
    title: "Test Portfolio 1",
    slug: "test-portfolio-1",
    company: "Test Company",
    date: new Date("2024-01-01").toISOString(),
    current: true,
    overview: "Test overview",
    thumbnailTemp: "test-thumbnail.jpg",
    createdAt: new Date("2024-01-01").toISOString(),
    updatedAt: new Date("2024-01-01").toISOString()
  }
];
var restHandlers = [
  http.get(`${API_URL}/api/posts`, () => {
    return HttpResponse.json(mockPosts);
  }),
  http.get(`${API_URL}/api/post/:slug`, ({ params }) => {
    const slug = params.slug;
    const post = mockPosts.find((p) => p.slug === slug);
    if (!post) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return HttpResponse.json(post);
  }),
  http.get(`${API_URL}/api/portfolios`, () => {
    return HttpResponse.json(mockPortfolios);
  }),
  http.get(`${API_URL}/api/portfolio/:slug`, ({ params }) => {
    const slug = params.slug;
    const portfolio = mockPortfolios.find((p) => p.slug === slug);
    if (!portfolio) {
      return HttpResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return HttpResponse.json(portfolio);
  })
];
// src/browser.ts
var handlers = [...restHandlers];
var worker = setupWorker(...handlers);
if ("window" in globalThis) {
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js"
    }
  });
}
var browser_default = worker;
// src/server.ts
import { setupServer } from "msw/node";
var handlers2 = [...restHandlers];
var server = setupServer(...handlers2);
if (typeof process !== "undefined") {
  server.listen({ onUnhandledRequest: "bypass" });
  process.once("SIGINT", () => {
    server.close();
  });
  process.once("SIGTERM", () => {
    server.close();
  });
}
var server_default = server;
export {
  browser_default as workerDefault,
  worker,
  server_default as server,
  restHandlers
};
