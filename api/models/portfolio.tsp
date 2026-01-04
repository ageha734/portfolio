import "./common.tsp";

namespace GraphCMS;

model Portfolio {
  id?: string;
  title: string;
  slug: string;
  company: string;

  @format("date")
  date: string;

  current: boolean;
  overview?: string;
  description?: string;
  content?: PortfolioContent;
  thumbnailTemp?: string;
  images?: Asset[];
  intro?: string;
}

model PortfolioContent {
  html: string;
}
