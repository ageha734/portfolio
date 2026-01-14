import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import "~/tailwind.css";

export default {
	title: "widgets/navbar/Header",
};

export const Default = () => (
	<MemoryRouter initialEntries={["/"]}>
		<Header />
	</MemoryRouter>
);

export const OnBlogPage = () => (
	<MemoryRouter initialEntries={["/blog"]}>
		<Header />
	</MemoryRouter>
);

export const OnPortfolioPage = () => (
	<MemoryRouter initialEntries={["/portfolio"]}>
		<Header />
	</MemoryRouter>
);
