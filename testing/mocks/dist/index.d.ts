/**
 * MSW (Mock Service Worker) の設定とハンドラーを提供するパッケージ
 *
 * 使用方法:
 * - Node.js環境（Vitestなど）: `import { server } from "@portfolio/testing-mocks"`
 * - ブラウザ環境（Storybookなど）: `import { worker } from "@portfolio/testing-mocks/browser"`
 * - ハンドラーのみ: `import { graphcmsHandlers } from "@portfolio/testing-mocks"`
 */
export { default as workerDefault, worker } from "./browser";
export { restHandlers } from "./handlers";
export { default as server } from "./server";
export * from "./types";
//# sourceMappingURL=index.d.ts.map