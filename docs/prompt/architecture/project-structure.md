# Project Structure

## 各レイヤーの説明

### /

アプリケーションのエントリーポイントを配置します。

- `root.tsx`: ルートコンポーネント、メタデータ、エラーバウンダリ
- `entry.client.tsx`: クライアントサイドのエントリーポイント
- `entry.server.tsx`: サーバーサイドのエントリーポイント

### routes/

各ページ（画面）を構築します。Remixの`routes/`ディレクトリに対応します。

- ファイルベースルーティング
- `loader`関数でサーバーサイドデータフェッチ
- `action`関数でフォーム送信処理

例: `routes/blog.$slug.tsx`, `routes/portfolio.$slug.tsx`

### widgets/

ページ内で使用される自己完結型の大きなUIブロックを管理します。

- 複数のfeaturesやentitiesを組み合わせた複合コンポーネント
- ページ固有の大きなUIセクション
- 例: `Footer`, `Navbar`, `Hero`, `Sections`

各ウィジェットは以下の構造を持ちます：

```text
widget-name/
├── ui/
│   └── WidgetName.tsx
├── model/
│   └── types.ts
└── index.ts
```

### features/

ユーザー視点で意味のある機能を表します。

- 特定のユースケースに特化したコンポーネント
- ビジネスロジックを含む
- 例: `BlogPreview`, `PortfolioPreview`, `ShareButton`

各フィーチャーは以下の構造を持ちます：

```text
feature-name/
├── ui/
│   └── FeatureName.tsx
├── model/
│   └── types.ts
├── lib/
│   └── LibraryName.ts
└── index.ts
```

### entities/

アプリケーションのドメインに関わるデータモデルを管理します。

- ビジネスエンティティの型定義
- エンティティ固有のロジック
- 例: `Blog`, `Portfolio`, `User`

各エンティティは以下の構造を持ちます：

```text
entity-name/
├── model/
│   └── types.ts
├── lib/
│   └── LibraryName.ts
└── index.ts
```

### shared/

全体で再利用可能なリソースを配置します。

- **ui/**: 汎用UIコンポーネント（Button、Inputなど）

- **lib/**: ユーティリティ関数（日付フォーマット、文字列処理など）

- **api/**: APIクライアント、GraphQLクエリなど

- **config/**: 設定ファイル（定数、i18n設定など）

- **hooks/**: カスタムReactフック

- **types/**: 共通型定義

## ファイル命名規則

### コンポーネント

- PascalCaseを使用: `BlogPreview.tsx`
- ファイル名はコンポーネント名と一致

### ユーティリティ

- camelCaseを使用: `formatDate.ts`, `getUserData.ts`

### 型定義

- PascalCaseを使用: `types.ts`内で`BlogPreviewProps`など

### テストファイル

- コンポーネント名に`.test.tsx`を追加: `BlogPreview.test.tsx`
- スナップショットテスト: `BlogPreview.test.tsx.snap`

詳細なコーディング規約は [`../development/coding-standards.md`](../development/coding-standards.md) を参照してください。
