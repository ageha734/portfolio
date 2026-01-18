import "@typespec/http";
import "@typespec/openapi3";
import "./endpoints/posts.tsp";
import "./endpoints/portfolios.tsp";

using TypeSpec.Http;

@service(#{
    title: "Portfolio API",
})
@server("http://localhost:8787")
@server("https://api.example.com")
namespace Api;
