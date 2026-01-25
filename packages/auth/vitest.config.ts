import { createVitestConfig } from "@portfolio/vitest-config";

export default createVitestConfig({
    test: {
        coverage: {
            include: ["src/**/*.ts"],
            exclude: [
                "dist/**",
                "**/*.test.ts",
                "**/*.d.ts",
            ],
        },
    },
});
