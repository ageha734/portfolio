# データフェッチング

## Remixのローダー

### 基本的なローダー

- `loader`関数によりサーバーサイドでデータを取得
- `useLoaderData`によりクライアント側でデータを使用

```typescript
// ✅ Good: routes/blog.$slug.tsx
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const post = await getPost(params.slug);

    if (!post) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ post });
};

export default function BlogPost() {
    const { post } = useLoaderData<typeof loader>();

    return (
        <article>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
        </article>
    );
}
```

### 並列データフェッチ

- `Promise.all`で複数のデータを並列取得
- パフォーマンスを最適化

```typescript
// ✅ Good
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const [post, comments, relatedPosts] = await Promise.all([
        getPost(params.slug),
        getComments(params.slug),
        getRelatedPosts(params.slug),
    ]);

    return json({ post, comments, relatedPosts });
};
```

## GraphQLクエリ

### GraphCMSとの連携

- TypeSpecでAPI型を定義
- 型安全なクエリを実行

```typescript
// ✅ Good: shared/api/graphcms.ts
export const getPost = async (slug: string) => {
    const query = `
        query GetPost($slug: String!) {
            post(where: { slug: $slug }) {
                title
                content
                date
            }
        }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GRAPHQL_TOKEN}`,
        },
        body: JSON.stringify({ query, variables: { slug } }),
    });

    const { data } = await response.json();
    return data.post;
};
```

## フォーム送信

### Remixのアクション

- `action`関数でフォームデータを処理
- `useActionData`でエラーや成功メッセージを取得

```typescript
// ✅ Good
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const email = formData.get("email");

    // バリデーション
    if (!email || typeof email !== "string") {
        return json({ error: "Email is required" }, { status: 400 });
    }

    // データ処理
    await subscribeNewsletter(email);

    return json({ success: true });
};

export default function Newsletter() {
    const actionData = useActionData<typeof action>();
    const fetcher = useFetcher();

    return (
        <fetcher.Form method="post">
            <input name="email" type="email" />
            {actionData?.error && <p>{actionData.error}</p>}
            {actionData?.success && <p>登録完了しました</p>}
            <button type="submit">登録</button>
        </fetcher.Form>
    );
}
```

## useFetcher

### 非同期操作

- ページ遷移なしでデータを取得・送信
- ローディング状態を管理

```typescript
// ✅ Good: テーマ切り替え
const fetcher = useFetcher();

function toggleTheme(newTheme?: string) {
    fetcher.submit(
        { theme: newTheme || (theme === "dark" ? "light" : "dark") },
        { action: "/api/set-theme", method: "post" },
    );
}

const theme = (fetcher.formData?.get("theme") as string) || initialTheme;
```

### オプティミスティックUI

- 即座にUIを更新
- エラー時はロールバック

```typescript
// ✅ Good
const fetcher = useFetcher();

const handleLike = () => {
    fetcher.submit(
        { postId },
        { action: "/api/like", method: "post" },
    );
};

// オプティミスティックにUIを更新
const isLiked = fetcher.formData ? true : post.isLiked;
```

## エラーハンドリング

### ローダーでのエラー

- 適切なHTTPステータスコードを返す
- エラーメッセージをユーザーに表示

```typescript
// ✅ Good
export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        const post = await getPost(params.slug);

        if (!post) {
            throw new Response("Not Found", { status: 404 });
        }

        return json({ post });
    } catch (error) {
        console.error("Failed to load post:", error);
        throw new Response("Internal Server Error", { status: 500 });
    }
};
```

## キャッシング

### HTTPキャッシング

- 静的データに適切なキャッシュヘッダーを設定
- Cloudflare Pagesのキャッシング機能を活用

```typescript
// ✅ Good
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const post = await getPost(params.slug);

    return json(
        { post },
        {
            headers: {
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        },
    );
};
```

### セッション管理

- Cookieベースのセッション管理
- ユーザー固有のデータを保存

```typescript
// ✅ Good: root.tsx
const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 604_800,
        path: "/",
        sameSite: "lax",
        secure: true,
    },
});

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const session = await getSession(request.headers.get("Cookie"));
    const theme = session.get("theme") || "dark";

    return json(
        { theme },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        },
    );
};
```
