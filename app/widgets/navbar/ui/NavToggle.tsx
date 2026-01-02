import type { ComponentProps } from "react";
import styles from "./NavToggle.module.css";

export interface NavToggleProps extends ComponentProps<"button"> {
    readonly menuOpen: boolean;
}

export const NavToggle = ({ menuOpen, className, ...rest }: NavToggleProps) => {
    return (
        <button type="button" className={`${styles.toggle} ${className || ""}`} aria-label="Menu" aria-expanded={menuOpen} {...rest}>
            <div className={styles.inner}>
                <svg
                    className={styles.icon}
                    data-menu={true}
                    data-open={menuOpen}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <svg
                    className={styles.icon}
                    data-close={true}
                    data-open={menuOpen}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
        </button>
    );
};
