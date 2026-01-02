import { MemoryRouter } from "react-router-dom";
import { HeaderMobile } from "./HeaderMobile";
import "~/styles/index.css";

export default {
    title: "widgets/navbar/HeaderMobile",
};

export const Default = () => (
    <MemoryRouter initialEntries={["/"]}>
        <HeaderMobile />
    </MemoryRouter>
);

export const OnBlogPage = () => (
    <MemoryRouter initialEntries={["/blog"]}>
        <HeaderMobile />
    </MemoryRouter>
);

export const OnPortfolioPage = () => (
    <MemoryRouter initialEntries={["/portfolio"]}>
        <HeaderMobile />
    </MemoryRouter>
);
