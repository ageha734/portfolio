import "./common.tsp";

namespace GraphCMS;

model Post {
    id: string;
    title: string;
    slug: string;

    @format("date")
    date: string;

    description?: string;
    content: PostContent;
    imageTemp: string;
    tags: string[];
    sticky: boolean;
    intro?: string;

    @format("date-time")
    createdAt?: string;

    @format("date-time")
    updatedAt?: string;

    images?: Asset[];
}

model PostContent {
    html: string;
    raw?: unknown;
}
