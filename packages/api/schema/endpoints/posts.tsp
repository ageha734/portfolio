import "@typespec/http";
import "@typespec/openapi3";
import "../models/post.tsp";
import "../models/paginated-response.tsp";
import "../models/error-response.tsp";

using TypeSpec.Http;

@tag("Posts")
@route("/api")
namespace Api.Posts {
    @get
    @route("/posts")
    @summary("Get all posts")
    op listPosts(
        @query page?: int32,
        @query perPage?: int32,
        @query tag?: string,
    ): Post[] | PaginatedResponse<Post>;

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
