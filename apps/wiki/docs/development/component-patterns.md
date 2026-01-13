# コンポーネントパターン

## コンポーネントの分類

### Shared UI (`shared/ui/`)

- 再利用可能な汎用UIコンポーネント
- プロジェクト全体で使用される基本的なコンポーネント
- ビジネスロジックを含まない

### Features (`features/`)

- ユーザー視点で意味のある機能単位
- 特定のユースケースに特化したコンポーネント
- ビジネスロジックを含む

### Widgets (`widgets/`)

- ページ内で使用される大きなUIブロック
- 複数のfeaturesやentitiesを組み合わせた複合コンポーネント
- 自己完結型のUIセクション

## コンポーネントの実装パターン

### 関数コンポーネント

- 常に関数コンポーネントを使用
- アロー関数または関数宣言を使用可能

```typescript
// ✅ Good: アロー関数
export const BlogPreview = (props: BlogPreviewProps) => {
    // ...
};

// ✅ Good: 関数宣言
export function BlogPreview(props: BlogPreviewProps) {
    // ...
}
```

### Props分割代入

- Propsは分割代入で受け取る
- デフォルト値を設定可能

```typescript
// ✅ Good
export const BlogPreview = (props: BlogPreviewProps) => {
    const { className, date, heading = "h3", slug, image, title } = props;
    // ...
};

// ✅ Good: 直接分割代入
export const BlogPreview = ({ className, date, heading = "h3", slug, image, title }: BlogPreviewProps) => {
    // ...
};
```

### 条件付きレンダリング

- 早期リターンを使用
- 三項演算子はシンプルな場合のみ

```typescript
// ✅ Good: 早期リターン
export const FooterMobile = () => {
    const { pathname } = useLocation();
    const isResume = pathname.startsWith("/resume");

    if (isResume) return null;

    return (
        <footer>
            {/* ... */}
        </footer>
    );
};

// ✅ Good: 三項演算子（シンプルな場合）
const status = isLoading ? "loading" : "ready";
```

### クラス名の結合

- `classnames`ライブラリを使用
- 条件付きクラス名を簡潔に記述

```typescript
import classnames from "classnames";

// ✅ Good
<div className={classnames("base-class", className, { "conditional-class": isActive })}>
    {/* ... */}
</div>
```

### 画像最適化

- `loading="lazy"`を設定
- `alt`属性を必須で設定
- サイズを明示的に指定

```typescript
// ✅ Good
<img
    alt={title}
    className="transition-transform duration-300 ease-in-out hover:scale-105"
    height="auto"
    loading="lazy"
    src={image}
    width="auto"
/>
```

### リンクとナビゲーション

- Remixの`Link`コンポーネントを使用
- `prefetch="intent"`でパフォーマンス最適化

```typescript
import { Link } from "@remix-run/react";

// ✅ Good
<Link
    className="blog-preview"
    prefetch="intent"
    to={`/blog/${slug}`}
>
    {title}
</Link>
```

## フックの使用

### カスタムフック

- 再利用可能なロジックはカスタムフックに抽出
- `shared/hooks/`に配置
- `use`プレフィックスを使用

```typescript
// ✅ Good
export const usePageTracking = () => {
    // ...
};

export const useIntro = () => {
    // ...
};
```

### Remixフック

- `useLoaderData`: ローダーからのデータ取得
- `useFetcher`: フォーム送信やデータフェッチ
- `useNavigation`: ナビゲーション状態の取得
- `useLocation`: 現在のロケーション情報

```typescript
// ✅ Good
const { theme } = useLoaderData<{ theme: string }>();
const fetcher = useFetcher();
const { state } = useNavigation();
const { pathname } = useLocation();
```

## エクスポート

### 名前付きエクスポート

- デフォルトエクスポートより名前付きエクスポートを推奨
- `index.ts`で再エクスポート

```typescript
// ✅ Good: 名前付きエクスポート
export const BlogPreview = () => {
    // ...
};

// index.ts
export { BlogPreview } from "./ui/BlogPreview";
export type { BlogPreviewProps } from "./ui/BlogPreview";
```

## パフォーマンス最適化

### React.memo

- 不要な再レンダリングを防ぐ
- Propsが頻繁に変更されないコンポーネントに使用

```typescript
// ✅ Good: メモ化が必要な場合
export const BlogPreview = React.memo((props: BlogPreviewProps) => {
    // ...
});
```

### useMemo / useCallback

- 計算コストが高い処理や関数をメモ化
- 依存配列を正確に指定

```typescript
// ✅ Good: 計算コストが高い場合
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);

// ✅ Good: コールバック関数のメモ化
const handleClick = useCallback(() => {
    // ...
}, [dependency]);
```
