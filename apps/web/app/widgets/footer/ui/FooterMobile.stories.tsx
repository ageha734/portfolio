import { MemoryRouter } from "react-router-dom";
import { FooterMobile } from "./FooterMobile";
import "~/tailwind.css";

export default {
    title: "widgets/footer/FooterMobile",
};

export const Default = () => (
    <MemoryRouter initialEntries={["/"]}>
        <FooterMobile />
    </MemoryRouter>
);

export const OnBlogPage = () => (
    <MemoryRouter initialEntries={["/blog"]}>
        <FooterMobile />
    </MemoryRouter>
);

export const OnPortfolioPage = () => (
    <MemoryRouter initialEntries={["/portfolio"]}>
        <FooterMobile />
    </MemoryRouter>
);

export const HiddenOnResume = () => (
    <MemoryRouter initialEntries={["/resume"]}>
        <div className="p-4">
            <p className="mb-4 text-color-copy-light text-sm">
                FooterMobileはresumeページでは表示されません（nullを返します）
            </p>
            <FooterMobile />
        </div>
    </MemoryRouter>
);
