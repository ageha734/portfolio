import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";
import "~/tailwind.css";

export default {
    title: "widgets/footer/Footer",
};

export const Default = () => (
    <MemoryRouter initialEntries={["/"]}>
        <Footer />
    </MemoryRouter>
);

export const OnBlogPage = () => (
    <MemoryRouter initialEntries={["/blog"]}>
        <Footer />
    </MemoryRouter>
);

export const OnPortfolioPage = () => (
    <MemoryRouter initialEntries={["/portfolio"]}>
        <Footer />
    </MemoryRouter>
);

export const HiddenOnResume = () => (
    <MemoryRouter initialEntries={["/resume"]}>
        <div className="p-4">
            <p className="mb-4 text-sm text-color-copy-light">
                Footerはresumeページでは表示されません（nullを返します）
            </p>
            <Footer />
        </div>
    </MemoryRouter>
);
