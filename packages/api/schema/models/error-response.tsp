import "@typespec/http";
import "@typespec/openapi3";

model ErrorResponse {
    error: string;
    details?: unknown;
}
