# アクセシビリティテスト

このディレクトリには、WCAG準拠とキーボードナビゲーションを検証するアクセシビリティテストが含まれています。

## ファイル構成

テストは機能ごとに分割されています：

- **`navigation.spec.ts`**: ナビゲーション関連のテスト
- **`keyboard.spec.ts`**: キーボードナビゲーションとフォーカス管理のテスト
- **`images.spec.ts`**: 画像のalt属性のテスト
- **`forms.spec.ts`**: フォーム要素のラベルのテスト
- **`semantic.spec.ts`**: 見出し階層、ARIAランドマーク、スキップリンクのテスト
- **`labels.spec.ts`**: ボタンとリンクのラベルのテスト
- **`contrast.spec.ts`**: 色のコントラストのテスト
- **`helpers.ts`**: 共通の設定とヘルパー関数

## テスト内容

以下のアクセシビリティ要件を検証します：

- **見出し階層**: h1が適切に使用されているか（`semantic.spec.ts`）
- **ナビゲーション**: ナビゲーションが適切にラベル付けされているか（`navigation.spec.ts`）
- **キーボードナビゲーション**: Tabキーでナビゲーションできるか（`keyboard.spec.ts`）
- **画像のalt属性**: 画像に適切なalt属性があるか（`images.spec.ts`）
- **フォームラベル**: フォーム要素に適切なラベルがあるか（`forms.spec.ts`）
- **ボタンラベル**: ボタンに適切なラベルがあるか（`labels.spec.ts`）
- **リンクテキスト**: リンクに適切なテキストがあるか（`labels.spec.ts`）
- **色のコントラスト**: テキスト要素が存在するか（`contrast.spec.ts`）
- **スキップリンク**: スキップリンクが存在するか（オプション）（`semantic.spec.ts`）
- **ARIAランドマーク**: 適切なARIAランドマークが使用されているか（`semantic.spec.ts`）
- **フォーカス管理**: フォーカス可能な要素が適切に管理されているか（`keyboard.spec.ts`）

## 実行方法

### 実アプリケーションとLadleの両方でテストを実行

```bash
# 実アプリケーションのテストを実行
bun run e2e -- apps/web/e2e/accessibility

# Ladleのテストを実行
TEST_CONTEXT=ladle bun run ladle -- apps/web/e2e/accessibility
```

### 環境変数による制御

環境変数 `TEST_CONTEXT` で実行するコンテキストを指定できます：

- `app`: 実アプリケーションのみ実行
- `ladle`: Ladleのみ実行
- 未指定: 両方実行（ただし、実アプリケーションのPlaywright設定ではLadleのURLにアクセスできないため、実アプリケーションのみ実行されます）

```bash
# 実アプリケーションのみ実行
TEST_CONTEXT=app bun run e2e -- apps/web/e2e/accessibility

# Ladleのみ実行
TEST_CONTEXT=ladle bun run ladle -- apps/web/e2e/accessibility
```

## Ladleでのテスト

Ladleでのテストを実行するには、Ladleサーバーが起動している必要があります：

```bash
# Ladleサーバーを起動（別のターミナル）
bun run dev:ui

# Ladleのテストを実行
bun run ladle -- apps/web/e2e/accessibility
```

## テスト対象

現在、以下のコンテキストでテストを実行できます：

- **実アプリケーション**: `/` (ホームページ)
- **Ladle**: `/iframe.html?id=pages-home--default` (Homeページのストーリー)

## 追加のストーリーをテストに追加

新しいLadleストーリーをテストに追加するには、`helpers.ts`の`getTestConfigs`関数内の配列に新しい設定を追加してください：

```typescript
const configs: TestConfig[] = [
    // ... 既存の設定 ...
    {
        name: "Ladle (新しいストーリー)",
        context: "ladle",
        url: "/iframe.html?id=新しいストーリーID",
    },
];
```

すべてのテストファイルは`helpers.ts`から`getTestConfigs()`をインポートして使用するため、一度追加すればすべてのテストで自動的に使用されます。
