import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useFetcher, useLoaderData, useLocation } from "@remix-run/react";
import { NavToggle } from "./NavToggle";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks, socialLinks, type NavLink, type SocialLink } from "./NavData";
import { SITE_AUTHOR } from "~/shared/config/constants";
import styles from "./Navbar.module.css";

interface Measurement {
    element: Element;
    top: number;
    bottom: number;
}

function cssProps(props: Record<string, number | string>): CSSProperties {
    return Object.fromEntries(
        Object.entries(props).map(([key, value]) => [
            key
                .split("")
                .map((char) => (char >= "A" && char <= "Z" ? `-${char.toLowerCase()}` : char))
                .join(""),
            value,
        ]),
    ) as CSSProperties;
}

function msToNum(value: string | number): number {
    return typeof value === "string" ? Number.parseFloat(value) : value;
}

function numToMs(value: number): string {
    return `${value}ms`;
}

const media = {
    mobile: 768,
};

const tokens = {
    base: {
        durationL: "500ms",
        durationS: "200ms",
    },
};

function useScrollToHash() {
    return (hash: string, callback?: () => void) => {
        const element = document.querySelector(hash);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            callback?.();
        }
    };
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: globalThis.window.innerWidth,
                height: globalThis.window.innerHeight,
            });
        };

        handleResize();
        globalThis.window.addEventListener("resize", handleResize);
        return () => globalThis.window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

const Monogram = ({ highlight }: { highlight?: boolean }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect width="32" height="32" rx="4" fill={highlight ? "currentColor" : "transparent"} />
        <text x="16" y="22" textAnchor="middle" fontSize="20" fill="currentColor">
            MS
        </text>
    </svg>
);

const Icon = ({ className, icon }: { className?: string; icon: string }) => {
    const iconMap: Record<string, ReactNode> = {
        github: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.32c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.027 1.592 1.027 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    fill="currentColor"
                />
            </svg>
        ),
    };

    return <span className={className}>{iconMap[icon] || icon}</span>;
};

export const Navbar = () => {
    const [current, setCurrent] = useState<string | undefined>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [target, setTarget] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const fetcher = useFetcher();
    const { theme: initialTheme } = useLoaderData<{ canonicalUrl: string; theme: string }>();
    const theme = (fetcher.formData?.get("theme") as string) || initialTheme;
    const location = useLocation();
    const windowSize = useWindowSize();
    const headerRef = useRef<HTMLElement>(null);
    const mobileNavRef = useRef<HTMLElement>(null);
    const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
    const scrollToHash = useScrollToHash();

    useEffect(() => {
        setCurrent(`${location.pathname}${location.hash}`);
    }, [location]);

    useEffect(() => {
        if (!target || location.pathname !== "/") return;
        setCurrent(`${location.pathname}${target}`);
        scrollToHash(target, () => setTarget(null));
    }, [location.pathname, scrollToHash, target]);

    useEffect(() => {
        if (menuOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), msToNum(tokens.base.durationL));
            return () => clearTimeout(timer);
        }
    }, [menuOpen]);

    useEffect(() => {
        const navItems = document.querySelectorAll("[data-navbar-item]");
        const inverseTheme = theme === "dark" ? "light" : "dark";
        const { innerHeight } = globalThis.window;

        let inverseMeasurements: Measurement[] = [];
        let navItemMeasurements: Measurement[] = [];

        const isOverlap = (rect1: Measurement, rect2: Measurement, scrollY: number): boolean => {
            return !(rect1.bottom - scrollY < rect2.top || rect1.top - scrollY > rect2.bottom);
        };

        const resetNavTheme = () => {
            for (const measurement of navItemMeasurements) {
                (measurement.element as HTMLElement).dataset.theme = "";
            }
        };

        const handleInversion = () => {
            const invertedElements = document.querySelectorAll(`[data-theme='${inverseTheme}'][data-invert]`);

            if (!invertedElements) return;

            inverseMeasurements = Array.from(invertedElements).map((item) => ({
                element: item,
                top: (item as HTMLElement).offsetTop,
                bottom: (item as HTMLElement).offsetTop + (item as HTMLElement).offsetHeight,
            }));

            const { scrollY } = globalThis.window;

            resetNavTheme();

            for (const inverseMeasurement of inverseMeasurements) {
                if (inverseMeasurement.top - scrollY > innerHeight || inverseMeasurement.bottom - scrollY < 0) {
                    continue;
                }

                for (const measurement of navItemMeasurements) {
                    if (isOverlap(inverseMeasurement, measurement, scrollY)) {
                        (measurement.element as HTMLElement).dataset.theme = inverseTheme;
                    } else {
                        (measurement.element as HTMLElement).dataset.theme = "";
                    }
                }
            }
        };

        if (theme === "light") {
            navItemMeasurements = Array.from(navItems).map((item) => {
                const rect = item.getBoundingClientRect();

                return {
                    element: item,
                    top: rect.top,
                    bottom: rect.bottom,
                };
            });

            document.addEventListener("scroll", handleInversion);
            handleInversion();
        }

        return () => {
            document.removeEventListener("scroll", handleInversion);
            resetNavTheme();
        };
    }, [theme, windowSize, location.key]);

    const getCurrent = (url = ""): "page" | undefined => {
        const nonTrailing = current?.endsWith("/") ? current?.slice(0, -1) : current;

        if (url === nonTrailing) {
            return "page";
        }

        return undefined;
    };

    const handleNavItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const hash = event.currentTarget.href.split("#")[1];
        setTarget(null);

        if (hash && location.pathname === "/") {
            setTarget(`#${hash}`);
            event.preventDefault();
        }
    };

    const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
        handleNavItemClick(event);
        if (menuOpen) setMenuOpen(false);
    };

    return (
        <header className={styles.navbar} ref={headerRef}>
            <RouterLink
                prefetch="intent"
                to={location.pathname === "/" ? "/#intro" : "/"}
                data-navbar-item
                className={styles.logo}
                aria-label={`${SITE_AUTHOR}, Software Engineer`}
                onClick={handleMobileNavClick}
            >
                <Monogram highlight />
            </RouterLink>
            <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
            <nav className={styles.nav}>
                <div className={styles.navList}>
                    {navLinks.map(({ label, pathname }: NavLink) => (
                        <RouterLink
                            prefetch="intent"
                            to={pathname}
                            key={label}
                            data-navbar-item
                            className={styles.navLink}
                            aria-current={getCurrent(pathname)}
                            onClick={handleNavItemClick}
                        >
                            {label}
                        </RouterLink>
                    ))}
                </div>
                <NavbarIcons desktop />
            </nav>
            {menuOpen && (
                <nav className={styles.mobileNav} data-visible={visible} ref={mobileNavRef}>
                    {navLinks.map(({ label, pathname }: NavLink, index: number) => (
                        <RouterLink
                            prefetch="intent"
                            to={pathname}
                            key={label}
                            className={styles.mobileNavLink}
                            data-visible={visible}
                            aria-current={getCurrent(pathname)}
                            onClick={handleMobileNavClick}
                            style={cssProps({
                                transitionDelay: numToMs(Number(msToNum(tokens.base.durationS)) + index * 50),
                            })}
                        >
                            {label}
                        </RouterLink>
                    ))}
                    <NavbarIcons />
                    <ThemeToggle isMobile />
                </nav>
            )}
            {!isMobile && <ThemeToggle data-navbar-item />}
        </header>
    );
};

interface NavbarIconsProps {
    desktop?: boolean;
}

const NavbarIcons = ({ desktop }: NavbarIconsProps) => (
    <div className={styles.navIcons}>
        {socialLinks.map(({ label, url, icon }: SocialLink) => (
            <a
                key={label}
                data-navbar-item={desktop || undefined}
                className={styles.navIconLink}
                aria-label={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon className={styles.navIcon} icon={icon} />
            </a>
        ))}
    </div>
);
