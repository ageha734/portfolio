import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors:{
        "color-background-light": "#fff",
        "color-background": "#f5f8fa",
        "color-background-dark": "#24292e",

        "color-border-light": "#f5f8fa",
        "color-border": "#cfd7dd",
        "color-border-dark": "#57606a",

        "color-copy-light": "#57606a",
        "color-copy": "#24292e",
        "color-copy-dark": "#57606a",

        "color-primary": "#f00"
      },

      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      screens: {
        xs: "320px"
      }
    },
  },
  plugins: [],
} satisfies Config;
