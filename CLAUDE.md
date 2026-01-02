# プロジェクトアーキテクチャと開発ルール

## アーキテクチャ

### Feature-Sliced Design (FSD)

このプロジェクトは、Feature-Sliced Design (FSD) アーキテクチャを採用しています。

#### レイヤー構造

```text
app/
├── app/              # アプリケーションエントリーポイント
├── pages/            # ページレイヤー
├── widgets/          # 大きなUIブロック
├── features/         # ユーザー機能
├── entities/         # ドメインモデル
└── shared/           # 共通リソース
    ├── ui/           # UIコンポーネント
    ├── lib/          # ユーティリティ
    ├── api/          # API関連
    ├── config/       # 設定
    └── types/        # 型定義
```

#### インポートルール

- 上位レイヤーから下位レイヤーへのみインポート可能
- 同じレイヤー内でのインポートは可能
- 下位レイヤーから上位レイヤーへのインポートは禁止

**例:**

- ✅ `pages/` → `widgets/`, `features/`, `shared/`
- ✅ `widgets/` → `features/`, `shared/`
- ✅ `features/` → `entities/`, `shared/`
- ❌ `shared/` → `features/`, `widgets/`, `pages/`

## 開発ルール

### コーディング規約

#### フォーマット・リント

- **Biome**を使用してコードのフォーマットとリントを実行
- コミット前に自動的にフォーマットとリントが実行される（lint-staged）

```bash
# フォーマット
bun run fmt:check

# リント
bun run lint
```

#### TypeScript

- 厳格モード（strict mode）を有効化
- 型定義は`shared/types`に集約
- 型のエクスポートは`shared/types/index.ts`から行う

#### コンポーネント

- コンポーネントは機能ごとに`features/`または`widgets/`に配置
- 再利用可能なUIコンポーネントは`shared/ui/`に配置
- Propsの型定義はコンポーネントファイル内で定義

### テスト

#### ユニットテスト

- **Vitest**を使用
- テストファイルは`*.test.ts`または`*.test.tsx`の命名規則
- カバレッジ95%以上を目標
- テストレポートは`docs/coverage`に出力

```bash
# ユニットテスト実行
bun run test

# カバレッジ付き実行
bun run coverage
```

#### E2Eテスト

- **Playwright**を使用
- テストファイルは`tests/e2e/`に配置
- テストレポートは`docs/playwright/report`に出力

```bash
bun run e2e
```

### Git規約

#### コミットメッセージ

- **Conventional Commits**形式を使用
- `commitlint`で自動検証

**形式:**

```text
<type>(<scope>): <subject>
```

**タイプ:**

- `feat`: 新機能
- `fix`: バグ修正
- `revert`: 巻き戻し

#### Git Hooks

- **Lefthook**を使用してGitフックを管理
- コミット前: lint-staged, commitlint
- プッシュ前: build

### ドキュメント

- **Docusaurus**を使用してドキュメントサイトを構築
- ドキュメントは`docs/docs/`に配置
- アーキテクチャ、開発ガイド、API仕様などを管理

```bash
# ドキュメント開発サーバー起動
bun run docs:dev

# ドキュメントビルド
bun run docs:build
```

## CI/CD

### GitHub Actions

- **CI**: リント、フォーマット、型チェック、テストを自動実行
- **デプロイ**:
  - Remixアプリ: Cloudflare Pages（自動デプロイ）
  - Ladle: GitHub Pages
  - Docusaurus: GitHub Pages
  - テストレポート: GitHub Pages

### デプロイフロー

1. `master`ブランチへのプッシュで自動デプロイ
2. Cloudflare PagesでRemixアプリをデプロイ
3. GitHub PagesでLadle、Docusaurus、テストレポートをデプロイ

## パフォーマンス

### Lighthouse CI

- パフォーマンス、アクセシビリティ、ベストプラクティス、SEOを監視
- 各カテゴリで90点以上を目標

```bash
# Lighthouse CI実行
bun run lighthouse
```

## その他のツール

- **Ladle**: コンポーネント開発環境
- **MSW**: APIモック
- **TypeDoc**: TypeScriptドキュメント生成（予定）
