# エラーハンドリング

## Remixのエラーバウンダリ

### ErrorBoundary

- `ErrorBoundary`関数をエクスポートしてエラーを処理
- ユーザーフレンドリーなエラーページを表示

```typescript
// ✅ Good: root.tsx
export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body data-theme="dark">
                <ErrorPage error={error as ErrorProps["error"]} />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
```

### ルートレベルのエラーハンドリング

- 各ルートで`ErrorBoundary`を定義可能
- 特定のページでカスタムエラーハンドリング

```typescript
// ✅ Good: routes/blog.$slug.tsx
export function ErrorBoundary() {
    const error = useRouteError();

    return (
        <div>
            <h1>ブログ記事の読み込みに失敗しました</h1>
            <p>{error.message}</p>
        </div>
    );
}
```

## ローダーでのエラーハンドリング

### try-catch

- ローダー内でエラーをキャッチ
- 適切なHTTPステータスコードを返す

```typescript
// ✅ Good
export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const data = await fetchData(params.slug);
        return json({ data });
    } catch (error) {
        throw new Response("Not Found", { status: 404 });
    }
};
```

### バリデーションエラー

- Zodなどのバリデーションライブラリを使用
- エラーメッセージをユーザーに表示

```typescript
import { z } from "zod";

const schema = z.object({
    slug: z.string().min(1),
});

// ✅ Good
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const result = schema.safeParse(params);

    if (!result.success) {
        throw new Response("Invalid parameters", { status: 400 });
    }

    // ...
};
```

## アクションでのエラーハンドリング

### フォームエラー

- `useActionData`でエラーを取得
- ユーザーにエラーメッセージを表示

```typescript
// ✅ Good
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const result = schema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return json(
            { errors: result.error.flatten().fieldErrors },
            { status: 400 }
        );
    }

    // ...
};

// コンポーネント内
const actionData = useActionData<typeof action>();
const errors = actionData?.errors;
```

## 非同期処理のエラーハンドリング

### Promiseのエラーハンドリング

- `async/await`を使用
- エラーを適切にキャッチ

```typescript
// ✅ Good
const fetchData = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};
```

## エラーコンポーネント

### ErrorPage

- 再利用可能なエラーページコンポーネント
- `widgets/error/`に配置

```typescript
// ✅ Good: widgets/error/ui/ErrorPage.tsx
export interface ErrorProps {
    error: Error | Response;
}

export const ErrorPage = ({ error }: ErrorProps) => {
    const isResponse = error instanceof Response;
    const status = isResponse ? error.status : 500;
    const message = isResponse ? error.statusText : error.message;

    return (
        <div>
            <h1>{status}</h1>
            <p>{message}</p>
        </div>
    );
};
```

## エラーロギング

### 本番環境でのエラーロギング

- エラーを外部サービスに送信（Sentryなど）
- ユーザーには詳細を表示しない

```typescript
// ✅ Good
export function ErrorBoundary() {
    const error = useRouteError();

    // 本番環境でのみエラーロギング
    if (process.env.NODE_ENV === "production") {
        // エラーロギングサービスに送信
        logError(error);
    }

    return <ErrorPage error={error} />;
}
```
