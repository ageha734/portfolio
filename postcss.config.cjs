module.exports = {
    plugins: {
        "@csstools/postcss-global-data": {
            files: ["app/global.module.css"],
        },
        "postcss-custom-media": {},
        "postcss-import": {},
        "postcss-preset-env": {},
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {},
        cssnano: {},
    },
};
