import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

export default {
    content: ["./app/**/*.{jsx,ts,tsx}"],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                "color-background-light": "#fff",
                "color-background": "#f5f8fa",
                "color-background-dark": "#24292e",
                "color-border-light": "#f5f8fa",
                "color-border": "#cfd7dd",
                "color-border-dark": "#57606a",
                "color-copy-light": "#57606a",
                "color-copy": "#24292e",
                "color-copy-dark": "#57606a",
                "color-primary": "#f00",
            },
            fontFamily: {
                "font-monospace": `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace`,
                "font-sans-serif": `sans-serif`,
                "font-serif": `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
            },
            screens: {
                xs: "320px",
            },
        },
    },
    plugins: [tailwindAnimate, tailwindTypography],
} satisfies Config;
