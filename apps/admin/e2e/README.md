# Admin E2Eテスト

このディレクトリには、管理画面(Admin)アプリケーションのE2Eテストが含まれています。

## ファイル構成

テストは機能ごとに分割されています：

- **`app.spec.ts`**: アプリケーション全体の基本テスト
- **`navigation.spec.ts`**: ナビゲーション機能のテスト
- **`posts.spec.ts`**: Postsページのテスト
- **`portfolios.spec.ts`**: Portfoliosページのテスト

## テスト内容

### アプリケーション (`app.spec.ts`)

- ルートページへのナビゲーション
- CMSタイトルの表示
- メインナビゲーションの表示
- レスポンシブレイアウトの動作

### ナビゲーション (`navigation.spec.ts`)

- Postsページへのナビゲーション
- Portfoliosページへのナビゲーション
- Dashboardへの戻りナビゲーション
- アクティブなナビゲーションアイテムのハイライト
- モバイルメニューの開閉

### Postsページ (`posts.spec.ts`)

- Postsページの表示
- コンテンツの表示確認
- ナビゲーションのアクセシビリティ
- レイアウトの維持
- モバイル対応

### Portfoliosページ (`portfolios.spec.ts`)

- Portfoliosページの表示
- コンテンツの表示確認
- ナビゲーションのアクセシビリティ
- レイアウトの維持
- モバイル対応

## 実行方法

```bash
# すべてのE2Eテストを実行
bun run e2e

# 特定のテストファイルを実行
bun run e2e -- e2e/app.spec.ts
bun run e2e -- e2e/navigation.spec.ts
bun run e2e -- e2e/posts.spec.ts
bun run e2e -- e2e/portfolios.spec.ts

# デバッグモードで実行
bun run e2e -- --debug

# UIモードで実行
bun run e2e -- --ui
```

## テストポート

- デフォルトポート: `3000`
- 環境変数 `VITE_BASE_URL` で変更可能

## テストブラウザ

- **Chromium (Desktop)**: デスクトップ Chrome
- **Mobile Chromium**: Pixel 7

## 前提条件

- Vite開発サーバーが起動している必要があります（自動起動されます）
- TanStack Routerのルート設定が正しく構成されている必要があります

## テスト戦略

### レスポンシブテスト

- デスクトップビュー: 1280x800
- モバイルビュー: 375x667

### アクセシビリティ

- セマンティックHTML要素の使用
- ARIAラベルの確認
- キーボードナビゲーション

### 視覚的回帰

- レイアウトの一貫性
- ナビゲーションの視覚的フィードバック
