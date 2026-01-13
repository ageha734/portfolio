import "@typespec/http";
import "@typespec/openapi3";
import "./common.tsp";

model PostContent {
    html: string;
    raw?: unknown;
}

model Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    description?: string;
    content: PostContent;
    imageTemp: string;
    tags: string[];
    sticky: boolean;
    intro?: string;
    createdAt?: string;
    updatedAt?: string;
    images?: Asset[];
}

model BlogData {
    data: Post[];
    featured: Post[];
}
