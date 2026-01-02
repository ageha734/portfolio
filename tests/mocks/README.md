# Mock API

このディレクトリには、テスト用のモックAPIが含まれています。

## TypeSpecスキーマとの関係

このモックAPIは、`api/graphcms.tsp`で定義されたTypeSpecスキーマに基づいて実装されています。

- **型定義**: `types.ts` - TypeSpecのモデル定義に対応するTypeScript型定義
- **モックハンドラー**: `graphcms.ts` - TypeSpecで定義されたスキーマに準拠したMSWハンドラー

### スキーマの対応関係

| TypeSpecモデル | TypeScript型定義 | 説明 |
|---------------|-----------------|------|
| `GraphQLRequest` | `GraphQLRequest` | GraphQLリクエスト |
| `GraphQLResponse` | `GraphQLResponse` | GraphQLレスポンス |
| `GraphQLError` | `GraphQLError` | GraphQLエラー |
| `ErrorLocation` | `ErrorLocation` | エラー発生位置 |
| `ErrorResponse` | `ErrorResponse` | エラーレスポンス |
| `Post` | `Post` (shared/types) | ブログ投稿 |
| `PostContent` | `PostContent` | 投稿コンテンツ |
| `Portfolio` | `Portfolio` (shared/types) | ポートフォリオ |
| `PortfolioContent` | `PortfolioContent` | ポートフォリオコンテンツ |
| `Asset` | `Asset` | アセット |
| `Tag` | `Tag` | タグ |
| `EnumValue` | `EnumValue` | 列挙値 |
| `TypeInfo` | `TypeInfo` | 型情報 |

## GraphCMS Mock

GraphCMSのGraphQL APIをモックするためのハンドラーです。

### 使用方法

```typescript
import { server, graphcmsHandlers } from "~/tests/mocks";

// テストで使用
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### モックデータ

- **Posts**: テスト用のブログ投稿データ
- **Portfolios**: テスト用のポートフォリオデータ
- **Tags**: テスト用のタグデータ

### サポートされているクエリ

- `getPosts`: すべての投稿を取得
- `getPost`: スラッグで単一の投稿を取得
- `getPortfolios`: すべてのポートフォリオを取得
- `getPortfolioBySlug`: スラッグで単一のポートフォリオを取得
- `getSitemap`: サイトマップ用のデータを取得
