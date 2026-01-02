import { SOCIAL_GITHUB } from "~/shared/config/constants";

export interface NavLink {
    label: string;
    pathname: string;
}

export interface SocialLink {
    label: string;
    url: string;
    icon: string;
}

export const navLinks: NavLink[] = [
    {
        label: "Projects",
        pathname: "/#project-1",
    },
    {
        label: "Details",
        pathname: "/#details",
    },
    {
        label: "Articles",
        pathname: "/articles",
    },
    {
        label: "Contact",
        pathname: "/contact",
    },
];

export const socialLinks: SocialLink[] = [
    {
        label: "Github",
        url: SOCIAL_GITHUB,
        icon: "github",
    },
];
