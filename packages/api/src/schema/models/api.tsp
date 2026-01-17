import "@typespec/http";
import "@typespec/openapi3";
import "./post.tsp";
import "./portfolio.tsp";

@service({
    title: "Portfolio API",
    version: "1.0.0",
})
@server("http://localhost:8787", "Development server")
namespace Api;

@route("/api")
namespace Posts {
    @get
    @route("/posts")
    @summary("Get all posts")
    op listPosts(): Post[];

    @get
    @route("/post/{slug}")
    @summary("Get a post by slug")
    op getPostBySlug(@path slug: string): {
        @statusCode statusCode: 200;
        @body body: Post;
    } | {
        @statusCode statusCode: 404;
        @body body: ErrorResponse;
    };
}

@route("/api")
namespace Portfolios {
    @get
    @route("/portfolios")
    @summary("Get all portfolios")
    op listPortfolios(): Portfolio[];

    @get
    @route("/portfolio/{slug}")
    @summary("Get a portfolio by slug")
    op getPortfolioBySlug(@path slug: string): {
        @statusCode statusCode: 200;
        @body body: Portfolio;
    } | {
        @statusCode statusCode: 404;
        @body body: ErrorResponse;
    };
}

model ErrorResponse {
    error: string;
    details?: unknown;
}
