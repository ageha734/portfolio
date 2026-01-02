# パフォーマンス最適化

## Remixのパフォーマンス機能

### プリフェッチング

- `prefetch="intent"`でリンクホバー時にプリフェッチ
- `prefetch="render"`で即座にプリフェッチ

```typescript
// ✅ Good: ホバー時にプリフェッチ
<Link prefetch="intent" to="/blog/post">
    Post
</Link>

// ✅ Good: 即座にプリフェッチ（重要なページ）
<Link prefetch="render" to="/about">
    About
</Link>
```

### ローダーの最適化

- 必要なデータのみを取得
- 並列データフェッチを活用

```typescript
// ✅ Good: 並列フェッチ
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const [post, comments, author] = await Promise.all([
        getPost(params.slug),
        getComments(params.slug),
        getAuthor(params.slug),
    ]);

    return json({ post, comments, author });
};
```

## 画像最適化

### 遅延読み込み

- `loading="lazy"`で画像の遅延読み込み
- ビューポート外の画像を最適化

```typescript
// ✅ Good
<img
    alt={title}
    loading="lazy"
    src={image}
    height="auto"
    width="auto"
/>
```

### 画像サイズの指定

- `width`と`height`を明示的に指定
- レイアウトシフトを防止

```typescript
// ✅ Good
<img
    alt="Description"
    height={400}
    loading="lazy"
    src="/image.jpg"
    width={800}
/>
```

## React最適化

### React.memo

- Propsが変更されない限り再レンダリングを防ぐ
- 大きなリストのアイテムに使用

```typescript
// ✅ Good
export const BlogPreview = React.memo(({ title, date }: BlogPreviewProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{date}</p>
        </div>
    );
});
```

### useMemo

- 計算コストが高い値をメモ化
- 依存配列を正確に指定

```typescript
// ✅ Good
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);
```

### useCallback

- コールバック関数をメモ化
- 子コンポーネントの不要な再レンダリングを防止

```typescript
// ✅ Good
const handleClick = useCallback(() => {
    // ...
}, [dependency]);
```

## コード分割

### 動的インポート

- 大きなライブラリは動的インポート
- 必要な時のみロード

```typescript
// ✅ Good: 動的インポート
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// 使用時
<Suspense fallback={<Loading />}>
    <HeavyComponent />
</Suspense>
```

## バンドルサイズの最適化

### ツリーシェイキング

- 必要なモジュールのみをインポート
- 名前付きインポートを使用

```typescript
// ✅ Good: 必要なもののみインポート
import { Link } from "@remix-run/react";

// ❌ Bad: 全体をインポート
import * as Remix from "@remix-run/react";
```

### 外部ライブラリの最適化

- 軽量な代替ライブラリを検討
- 使用していない依存関係を削除

## メタデータ最適化

### メタ関数の最適化

- 必要なメタデータのみを返す
- 動的なメタデータを活用

```typescript
// ✅ Good
export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return [
        { title: data?.title || SITE_TITLE },
        { name: "description", content: data?.description || SITE_DESCRIPTION },
    ];
};
```

## Lighthouse CI

### パフォーマンス目標

- パフォーマンス: 90点以上
- アクセシビリティ: 90点以上
- ベストプラクティス: 90点以上
- SEO: 90点以上

```bash
# Lighthouse CI実行
bun run lighthouse
```

## キャッシング

### HTTPキャッシング

- 静的アセットに適切なキャッシュヘッダーを設定
- Cloudflare Pagesのキャッシング機能を活用

### セッション管理

- Cookieベースのセッション管理
- 適切な有効期限を設定

```typescript
// ✅ Good: root.tsx
const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 604_800, // 7日
        path: "/",
        sameSite: "lax",
        secure: true,
    },
});
```
