import "@typespec/http";
import "@typespec/openapi3";
import "./pagination-meta.tsp";

model PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}
