import "@typespec/http";
import "@typespec/openapi3";
import "./models/graphql.tsp";
import "./models/post.tsp";
import "./models/portfolio.tsp";

using TypeSpec.Http;
using TypeSpec.OpenAPI;

/**
 * GraphCMS GraphQL API仕様書
 * このAPIは、ポートフォリオサイトで使用するGraphCMSのGraphQL APIの仕様を定義しています。
 */
@server("https://api.graphcms.com/v2", "GraphCMS Production API")
@server("https://api.graphcms.com/v2/staging", "GraphCMS Staging API")
namespace GraphCMS;

@route("/graphql")
@post
@summary("GraphQL Query")
@doc("GraphQLエンドポイントへのPOSTリクエスト")
op graphqlQuery(
    @header("Authorization") @doc("GraphCMS API Token") authorization?: string,
    @body request: GraphQLRequest,
):
    | {
          @statusCode statusCode: 200;
          @body body: GraphQLResponse;
      }
    | {
          @statusCode statusCode: 400;
          @body body: ErrorResponse;
      }
    | {
          @statusCode statusCode: 401;
          @body body: ErrorResponse;
      }
    | {
          @statusCode statusCode: 404;
          @body body: ErrorResponse;
      };
