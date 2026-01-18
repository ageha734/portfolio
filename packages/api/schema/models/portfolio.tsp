import "@typespec/http";
import "@typespec/openapi3";
import "./asset.tsp";

model PortfolioContent {
    html: string;
}

model Portfolio {
    id?: string;
    title: string;
    slug: string;
    company: string;
    date: string;
    current: boolean;
    overview?: string;
    description?: string;
    content?: PortfolioContent;
    thumbnailTemp?: string;
    images?: Asset[];
    intro?: string;
}
