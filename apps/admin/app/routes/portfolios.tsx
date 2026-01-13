import { createFileRoute } from "@tanstack/react-router";
import { PortfoliosList } from "~/features/portfolios";

export const Route = createFileRoute("/portfolios")({
    component: PortfoliosList,
});
