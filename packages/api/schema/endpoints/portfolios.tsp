import "@typespec/http";
import "@typespec/openapi3";
import "../models/portfolio.tsp";
import "../models/paginated-response.tsp";
import "../models/error-response.tsp";
import "../models/asset.tsp";

using TypeSpec.Http;

@tag("Portfolios")
@route("/api")
namespace Api.Portfolios {
    @get
    @route("/portfolios")
    @summary("Get all portfolios")
    op listPortfolios(
        @query page?: int32,
        @query perPage?: int32,
    ): Portfolio[] | PaginatedResponse<Portfolio>;

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

    @post
    @route("/portfolios/{portfolioId}/images")
    @summary("Upload an image for a portfolio")
    op uploadPortfolioImage(
        @path portfolioId: string,
        @body body: bytes,
    ): {
        @statusCode statusCode: 200;
        @body body: Asset;
    } | {
        @statusCode statusCode: 400;
        @body body: ErrorResponse;
    } | {
        @statusCode statusCode: 404;
        @body body: ErrorResponse;
    };
}
