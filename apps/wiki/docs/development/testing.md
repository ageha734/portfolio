# テストガイドライン

このプロジェクトでは、コード品質を保証するために包括的なテスト戦略を採用しています。

## テスト戦略

### テストの種類

1. **ユニットテスト** (Vitest)
   - 個別の関数、コンポーネント、ユーティリティのテスト
   - カバレッジ目標: 80%以上

2. **E2Eテスト** (Playwright)
   - ユーザーシナリオに基づく統合テスト
   - ページオブジェクトモデル（POM）パターンを採用

3. **アクセシビリティテスト** (Playwright + axe-core)
   - WCAG準拠の検証
   - Storybook上でのコンポーネントテスト

4. **ビジュアルリグレッションテスト** (Playwright)
   - Storybook上でのスクリーンショット比較

5. **インタラクションテスト** (Playwright)
   - Storybook上でのコンポーネントインタラクション検証

## ユニットテスト (Vitest)

### テストファイルの配置

テストファイルは、テスト対象のファイルと同じディレクトリに配置します。

```text
app/
├── shared/
│   └── lib/
│       ├── formatDate.ts
│       └── formatDate.test.ts
└── features/
    └── blog-preview/
        ├── ui/
        │   ├── BlogPreview.tsx
        │   └── BlogPreview.test.tsx
        └── model/
            ├── types.ts
            └── types.test.ts
```

### テストの書き方

#### 関数のテスト

```typescript
// app/shared/lib/formatDate.test.ts
import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("should format date correctly", () => {
        const date = new Date("2024-01-01");
        const result = formatDate(date);
        expect(result).toBe("2024-01-01");
    });

    it("should handle invalid date", () => {
        const date = new Date("invalid");
        expect(() => formatDate(date)).toThrow();
    });
});
```

#### Reactコンポーネントのテスト

```typescript
// app/features/blog-preview/ui/BlogPreview.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BlogPreview } from "./BlogPreview";

describe("BlogPreview", () => {
    it("should render blog preview", () => {
        const props = {
            title: "Test Post",
            slug: "test-post",
            date: "2024-01-01",
        };

        render(<BlogPreview {...props} />);

        expect(screen.getByText("Test Post")).toBeInTheDocument();
    });

    it("should render link with correct href", () => {
        const props = {
            title: "Test Post",
            slug: "test-post",
            date: "2024-01-01",
        };

        render(<BlogPreview {...props} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/blog/test-post");
    });
});
```

#### Remixローダーのテスト

```typescript
// app/routes/blog.$slug.test.ts
import { describe, expect, it, vi } from "vitest";
import { loader } from "./blog.$slug";

describe("loader", () => {
    it("should return blog post data", async () => {
        const request = new Request("http://localhost/blog/test-post");
        const params = { slug: "test-post" };

        const response = await loader({ request, params, context: {} });
        const data = await response.json();

        expect(data.post).toBeDefined();
        expect(data.post.slug).toBe("test-post");
    });

    it("should return 404 for non-existent post", async () => {
        const request = new Request("http://localhost/blog/non-existent");
        const params = { slug: "non-existent" };

        await expect(
            loader({ request, params, context: {} })
        ).rejects.toThrow();
    });
});
```

### テストユーティリティ

共通のテストユーティリティは `testing/vitest/` に配置されています。

```typescript
// testing/vitest/setup.ts で設定される共通のセットアップ
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
    cleanup();
});
```

### カバレッジ設定

カバレッジレポートは次の設定で生成されます：

- **レポート形式**: HTML, LCOV
- **閾値**: 80%（lines, functions, branches, statements）
- **除外**: `.cache/`, `node_modules/`, `**/*.test.{ts,tsx}`, `**/*.config.{ts,js}`

```bash
# カバレッジレポートを生成
bun run coverage

# 特定のパッケージのカバレッジ
turbo run coverage --filter=@portfolio/web
```

## E2Eテスト (Playwright)

### ページオブジェクトモデル（POM）

E2Eテストでは、ページオブジェクトモデルパターンを採用しています。

#### ページオブジェクトの構造

```typescript
// e2e/pages/home.page.ts
import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async gotoHome(): Promise<void> {
        await this.page.goto("/");
    }

    async expectHeroVisible(): Promise<void> {
        await expect(this.page.locator("[data-testid='hero']")).toBeVisible();
    }

    async clickBlogLink(): Promise<void> {
        await this.page.getByRole("link", { name: "Blog" }).click();
    }
}
```

#### テストの書き方

```typescript
// e2e/home.spec.ts
import { expect, test } from "@playwright/test";
import { HomePage } from "./pages/home.page";

test("should display home page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.expectHeroVisible();
});

test("should navigate to blog page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.clickBlogLink();

    await expect(page).toHaveURL(/\/blog/);
});
```

### APIテスト

APIエンドポイントのレスポンスを検証するテストも含まれています。

```typescript
// e2e/api/blog.spec.ts
import { expect, test } from "@playwright/test";

test("should return blog posts", async ({ request }) => {
    const response = await request.get("/api/blog");
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
});

test("should return 404 for non-existent post", async ({ request }) => {
    const response = await request.get("/api/blog/non-existent");
    expect(response.status()).toBe(404);
});
```

### アクセシビリティテスト

Storybook上でコンポーネントのアクセシビリティを検証します。

```typescript
// e2e/accessibility/blog-preview.spec.ts
import { expect, test } from "@playwright/test";

test("BlogPreview should be accessible", async ({ page }) => {
    await page.goto("/iframe.html?id=features-blogpreview--default");

    const violations = await page.evaluate(() => {
        // axe-coreによるアクセシビリティチェック
        return window.axe?.run();
    });

    expect(violations).toBeUndefined();
});
```

### ビジュアルリグレッションテスト

Storybook上でスクリーンショット比較を行います。

```typescript
// e2e/storybook/visual/blog-preview.spec.ts
import { expect, test } from "@playwright/test";

test("BlogPreview visual regression", async ({ page }) => {
    await page.goto("/iframe.html?id=features-blogpreview--default");

    await expect(page).toHaveScreenshot("blog-preview.png");
});
```

## テスト実行

### ローカル環境

```bash
# すべてのユニットテストを実行
bun run test

# 特定のパッケージのテスト
turbo run test --filter=@portfolio/web

# ウォッチモード
bun vitest

# カバレッジレポート生成
bun run coverage

# E2Eテスト実行
bun run e2e

# アクセシビリティテスト
bun run accessibility

# ビジュアルリグレッションテスト
bun run visual

# インタラクションテスト
bun run interactions
```

### CI環境

CI環境では、Dockerコンテナ内でテストが実行されます。

```bash
# CI環境でのE2Eテスト実行例
docker run --rm -e CI=true \
  -v $(pwd):/work -w /work \
  -v $(pwd)/node_modules:/work/node_modules \
  portfolio-e2e bunx playwright test
```

## テストのベストプラクティス

### 1. テストの独立性

各テストは独立して実行可能であるべきです。

```typescript
// ✅ Good: 各テストが独立している
describe("formatDate", () => {
    it("should format date correctly", () => {
        // テスト1
    });

    it("should handle invalid date", () => {
        // テスト2（テスト1に依存しない）
    });
});
```

### 2. 明確なテスト名

テスト名は、何をテストしているかが明確であるべきです。

```typescript
// ✅ Good: 明確なテスト名
it("should return 404 when blog post does not exist", () => {
    // ...
});

// ❌ Bad: 曖昧なテスト名
it("should work", () => {
    // ...
});
```

### 3. AAAパターン

テストは Arrange（準備）、Act（実行）、Assert（検証）の3つのセクションに分けます。

```typescript
it("should format date correctly", () => {
    // Arrange: テストデータの準備
    const date = new Date("2024-01-01");

    // Act: テスト対象の実行
    const result = formatDate(date);

    // Assert: 結果の検証
    expect(result).toBe("2024-01-01");
});
```

### 4. モックの適切な使用

外部依存関係は適切にモックします。

```typescript
import { vi } from "vitest";

it("should fetch data from API", async () => {
    // API呼び出しをモック
    const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: "test" }),
    });

    global.fetch = mockFetch;

    const result = await fetchData();
    expect(result.data).toBe("test");
    expect(mockFetch).toHaveBeenCalledWith("/api/data");
});
```

### 5. エッジケースのテスト

正常系だけでなく、エッジケースもテストします。

```typescript
describe("formatDate", () => {
    it("should handle normal date", () => {
        // 正常系
    });

    it("should handle invalid date", () => {
        // エッジケース1
    });

    it("should handle null", () => {
        // エッジケース2
    });

    it("should handle empty string", () => {
        // エッジケース3
    });
});
```

## テストカバレッジ

### カバレッジ目標

- **全体**: 80%以上
- **新規コード**: 90%以上

### カバレッジレポートの確認

```bash
# HTMLレポートを開く
open docs/vitest/coverage/index.html

# LCOVレポート（CI用）
cat docs/vitest/coverage/lcov.info
```

## 参考資料

- [Vitest公式ドキュメント](https://vitest.dev/)
- [Playwright公式ドキュメント](https://playwright.dev/)
- [Testing Library公式ドキュメント](https://testing-library.com/)
- [Page Object Modelパターン](https://playwright.dev/docs/pom)
