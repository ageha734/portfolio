// src/index.ts
import tsconfigPaths from "vite-tsconfig-paths";
function createViteConfig(options = {}) {
  const { root = process.cwd(), tsconfigPath, additionalAliases = {} } = options;
  return {
    build: {
      assetsInlineLimit: 1024,
      target: "es2022"
    },
    resolve: {
      alias: {
        ...additionalAliases
      }
    },
    plugins: [
      tsconfigPaths({
        root,
        projects: tsconfigPath ? [tsconfigPath] : undefined,
        ignoreConfigErrors: true
      })
    ]
  };
}
export {
  createViteConfig
};
