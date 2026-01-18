# Page Object Models (POM)

このディレクトリには、PlaywrightのPage Object Model（POM）が含まれています。

## 構造

- `base.page.ts` - すべてのPOMが継承する基底クラス
- `home.page.ts` - ホームページのPOM
- `blog.page.ts` - ブログページのPOM
- `portfolio.page.ts` - ポートフォリオページのPOM
- `resume.page.ts` - 履歴書ページのPOM
- `uses.page.ts` - UsesページのPOM
- `index.ts` - すべてのページオブジェクトのエクスポート
- `*.page.spec.ts` - Ladle上でPOMを検証するテスト

## 使用方法

### 基本的な使用例

```typescript
import { HomePage } from "./pages/home.page";

test("example test", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.expectHeroVisible();
});
```

### 複数のページオブジェクトを使用

```typescript
import { HomePage, BlogPage, PortfolioPage } from "./pages";

test("navigation test", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHome();
    await homePage.clickBlogLink();

    const blogPage = new BlogPage(page);
    await blogPage.expectHeroVisible();
    await blogPage.expectBlogPreviewsVisible();
});
```

### Ladleでのテスト

各ページオブジェクトには、Ladleストーリー用のメソッドも用意されています：

```typescript
import { HomePage } from "./pages/home.page";

test("Ladle test", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomeLadle();
    await homePage.expectHeroVisible();
});
```

## 利用可能なページオブジェクト

### HomePage (`home.page.ts`)

- `gotoHome()`: ホームページに移動
- `gotoHomeLadle()`: Ladleのホームページストーリーに移動
- `expectHeroVisible()`: ヒーローセクションが表示されていることを確認
- `expectNavigationVisible()`: ナビゲーションが表示されていることを確認
- `clickBlogLink()`: ブログリンクをクリック
- `clickPortfolioLink()`: ポートフォリオリンクをクリック

### BlogPage (`blog.page.ts`)

- `gotoBlog()`: ブログページに移動
- `gotoBlogLadle()`: Ladleのブログページストーリーに移動
- `expectHeroVisible()`: ヒーローセクションが表示されていることを確認
- `expectFeaturedPostVisible()`: フィーチャー投稿が表示されていることを確認
- `expectBlogPreviewsVisible()`: ブログプレビューが表示されていることを確認
- `expectTechnicalSectionVisible()`: テクニカルセクションが表示されていることを確認
- `expectDIYSectionVisible()`: DIYセクションが表示されていることを確認
- `clickFirstBlogPost()`: 最初のブログ投稿をクリック

### PortfolioPage (`portfolio.page.ts`)

- `gotoPortfolio()`: ポートフォリオページに移動
- `gotoPortfolioLadle()`: Ladleのポートフォリオページストーリーに移動
- `expectHeroVisible()`: ヒーローセクションが表示されていることを確認
- `expectCurrentProjectsSectionVisible()`: 現在のプロジェクトセクションが表示されていることを確認
- `expectPastProjectsSectionVisible()`: 過去のプロジェクトセクションが表示されていることを確認
- `expectPortfolioItemsVisible()`: ポートフォリオアイテムが表示されていることを確認
- `expectPortfolioGridVisible()`: ポートフォリオグリッドが表示されていることを確認
- `clickFirstPortfolioItem()`: 最初のポートフォリオアイテムをクリック

### ResumePage (`resume.page.ts`)

- `gotoResume()`: 履歴書ページに移動
- `gotoResumeLadle()`: Ladleの履歴書ページストーリーに移動
- `expectNameVisible()`: 名前が表示されていることを確認
- `expectProfileImageVisible()`: プロフィール画像が表示されていることを確認
- `expectSocialLinksVisible()`: ソーシャルリンクが表示されていることを確認
- `expectDownloadButtonVisible()`: ダウンロードボタンが表示されていることを確認
- `expectExperienceSectionVisible()`: 経験セクションが表示されていることを確認
- `expectEducationSectionVisible()`: 教育セクションが表示されていることを確認
- `expectShareButtonVisible()`: シェアボタンが表示されていることを確認
- `clickDownloadButton()`: ダウンロードボタンをクリック

### UsesPage (`uses.page.ts`)

- `gotoUses()`: Usesページに移動
- `gotoUsesLadle()`: LadleのUsesページストーリーに移動
- `expectHeroVisible()`: ヒーローセクションが表示されていることを確認
- `expectHardwareSectionVisible()`: ハードウェアセクションが表示されていることを確認
- `expectSoftwareSectionVisible()`: ソフトウェアセクションが表示されていることを確認
- `expectMiscSectionVisible()`: その他セクションが表示されていることを確認
- `expectUsesContentVisible()`: Usesコンテンツが表示されていることを確認

## Ladle上でPOMを検証

```bash
# Ladleサーバーを起動
bun run dstudio

# 別のターミナルでPOMテストを実行
bun run e2e:ladle
```

## 実アプリケーションでE2Eテストを実行

```bash
# 実アプリケーションでE2Eテストを実行
bun run e2e
```

## POMの作成方法

1. `base.page.ts`を継承した新しいPOMクラスを作成
2. ページ固有のメソッドを実装
3. 実アプリケーション用とLadle用の両方のメソッドを提供
4. `*.page.spec.ts`でLadle上での動作を検証
5. 実アプリケーションのE2Eテストで使用

## ベストプラクティス

1. ページ固有の操作はページオブジェクトにカプセル化する
2. アサーションは`expect`メソッドとして実装する
3. 再利用可能な操作は基底クラスに配置する
4. ページオブジェクトは単一責任の原則に従う
5. 新しいページを追加する際は、実アプリケーション用とLadle用の両方のメソッドを提供する

## 参考

- [Playwright の POM を Storybook 上で確認してから E2E テストを書く](https://zenn.dev/silverbirder/articles/9841b14b358d61)
