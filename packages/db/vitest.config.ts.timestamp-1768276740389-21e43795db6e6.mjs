// vitest.config.ts
import { createVitestConfig } from "file:///Users/hibi-keita/Repository/github.com/ageha734/portfolio/tooling/vitest/src/index.ts";
import { defineConfig } from "file:///Users/hibi-keita/Repository/github.com/ageha734/portfolio/node_modules/vitest/dist/config.js";
var vitest_config_default = defineConfig({
    ...createVitestConfig(),
    test: {
        ...createVitestConfig().test,
        environment: "miniflare",
        environmentOptions: {
            bindings: {
                DB: {},
            },
        },
    },
});
export { vitest_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9oaWJpLWtlaXRhL1JlcG9zaXRvcnkvZ2l0aHViLmNvbS9hZ2VoYTczNC9wb3J0Zm9saW8vcGFja2FnZXMvZGJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9oaWJpLWtlaXRhL1JlcG9zaXRvcnkvZ2l0aHViLmNvbS9hZ2VoYTczNC9wb3J0Zm9saW8vcGFja2FnZXMvZGIvdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaGliaS1rZWl0YS9SZXBvc2l0b3J5L2dpdGh1Yi5jb20vYWdlaGE3MzQvcG9ydGZvbGlvL3BhY2thZ2VzL2RiL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBjcmVhdGVWaXRlc3RDb25maWcgfSBmcm9tIFwiQHBvcnRmb2xpby92aXRlc3QtY29uZmlnXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXN0L2NvbmZpZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIC4uLmNyZWF0ZVZpdGVzdENvbmZpZygpLFxuICAgIHRlc3Q6IHtcbiAgICAgICAgLi4uY3JlYXRlVml0ZXN0Q29uZmlnKCkudGVzdCxcbiAgICAgICAgZW52aXJvbm1lbnQ6IFwibWluaWZsYXJlXCIsXG4gICAgICAgIGVudmlyb25tZW50T3B0aW9uczoge1xuICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAgICAgICAgICAgICAgICBEQjoge30sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1ksU0FBUywwQkFBMEI7QUFDM2EsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDeEIsR0FBRyxtQkFBbUI7QUFBQSxFQUN0QixNQUFNO0FBQUEsSUFDRixHQUFHLG1CQUFtQixFQUFFO0FBQUEsSUFDeEIsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsTUFDaEIsVUFBVTtBQUFBLFFBQ04sSUFBSSxDQUFDO0FBQUEsTUFDVDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
