# Generated Mocks

このディレクトリには、Orvalによって自動生成されたMSWモックハンドラーが含まれています。

## 生成方法

```bash
bun run mock:generate
```

## 使用方法

生成されたモックは、`tests/mocks/index.ts`でインポートして使用できます。

```typescript
import { graphcmsHandlers } from "./generated";
import { setupServer } from "msw/node";

const server = setupServer(...graphcmsHandlers);
```

## 注意事項

- このディレクトリのファイルは自動生成されるため、手動で編集しないでください
- 変更が必要な場合は、`orval.config.ts`を編集してください
