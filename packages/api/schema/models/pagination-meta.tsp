import "@typespec/http";
import "@typespec/openapi3";

model PaginationMeta {
    page: int32;
    perPage: int32;
    total: int32;
    totalPages: int32;
}
