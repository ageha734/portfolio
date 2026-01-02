# アクセシビリティ

## セマンティックHTML

### 適切なHTML要素の使用

- 見出しは`h1`から`h6`を使用
- リストは`ul`/`ol`を使用
- ナビゲーションは`nav`を使用

```typescript
// ✅ Good
<nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
    </ul>
</nav>

// ❌ Bad
<div>
    <div><Link to="/">Home</Link></div>
    <div><Link to="/blog">Blog</Link></div>
</div>
```

### ランドマーク要素

- `main`, `header`, `footer`, `nav`を使用
- ページ構造を明確にする

```typescript
// ✅ Good: root.tsx
<body>
    <I18nextProvider i18n={i18n}>
        <Navbar />
        <Header />
        <main id="main-content" tabIndex={-1}>
            <Outlet />
        </main>
        <Footer />
    </I18nextProvider>
</body>
```

## ARIA属性

### aria-label

- アイコンボタンなどに適切なラベルを設定
- スクリーンリーダーで理解可能に

```typescript
// ✅ Good
<button aria-label="メニューを開く">
    <MenuIcon />
</button>
```

### aria-describedby

- 追加の説明が必要な要素に使用
- エラーメッセージとの関連付け

```typescript
// ✅ Good
<input
    aria-describedby="email-error"
    id="email"
    type="email"
/>
{error && <div id="email-error">{error}</div>}
```

### aria-hidden

- 装飾的な要素をスクリーンリーダーから隠す
- アイコンや装飾画像に使用

```typescript
// ✅ Good
<span aria-hidden="true">✨</span>
<span className="sr-only">新着</span>
```

## キーボードナビゲーション

### フォーカス管理

- タブ順序が論理的であることを確認
- フォーカス可能な要素に適切なスタイル

```typescript
// ✅ Good: スキップリンク
<a href="#main-content" className="skip-link">
    メインコンテンツへスキップ
</a>

<main id="main-content" tabIndex={-1}>
    {/* ... */}
</main>
```

### キーボードイベント

- マウスイベントだけでなくキーボードイベントも処理
- EnterキーやSpaceキーで操作可能に

```typescript
// ✅ Good
const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClick();
    }
};

<button onClick={handleClick} onKeyDown={handleKeyDown}>
    Click me
</button>
```

## 画像のアクセシビリティ

### alt属性

- すべての画像に`alt`属性を設定
- 装飾的な画像は空文字列

```typescript
// ✅ Good: 意味のある画像
<img alt="ブログ記事のサムネイル画像" src={image} />

// ✅ Good: 装飾的な画像
<img alt="" src="/decoration.svg" />

// ❌ Bad: alt属性なし
<img src={image} />
```

### 画像の説明

- 複雑な画像は`longdesc`や周囲のテキストで説明
- チャートやグラフは代替テキストで説明

## フォームのアクセシビリティ

### ラベル

- すべての入力フィールドにラベルを関連付け
- `htmlFor`と`id`で関連付け

```typescript
// ✅ Good
<label htmlFor="email">メールアドレス</label>
<input id="email" type="email" />

// ✅ Good: ラベルで囲む
<label>
    メールアドレス
    <input type="email" />
</label>
```

### エラーメッセージ

- エラーを明確に表示
- `aria-invalid`と`aria-describedby`を使用

```typescript
// ✅ Good
<input
    aria-describedby="email-error"
    aria-invalid={!!error}
    id="email"
    type="email"
/>
{error && (
    <div id="email-error" role="alert">
        {error}
    </div>
)}
```

## カラーコントラスト

### コントラスト比

- テキストと背景のコントラスト比は4.5:1以上
- 大きなテキストは3:1以上

### カラーだけに依存しない

- 情報を色だけで伝えない
- アイコンやテキストで補完

```typescript
// ✅ Good: アイコンとテキスト
<span className="error">
    <ErrorIcon />
    エラーが発生しました
</span>

// ❌ Bad: 色だけ
<span className="error">エラーが発生しました</span>
```

## 動的コンテンツ

### ライブリージョン

- 動的に更新されるコンテンツに`aria-live`を使用
- 重要度に応じて`polite`または`assertive`

```typescript
// ✅ Good
<div aria-live="polite" role="status">
    {message}
</div>
```

### ローディング状態

- ローディング中であることを示す
- `aria-busy`や`aria-live`を使用

```typescript
// ✅ Good
<div aria-busy={isLoading} aria-live="polite">
    {isLoading ? "読み込み中..." : content}
</div>
```

## テスト

### アクセシビリティテスト

- Playwrightでアクセシビリティテストを実行
- axe-coreなどのツールを使用

```typescript
// ✅ Good: E2Eテスト
test("should be accessible", async ({ page }) => {
    await page.goto("/");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
});
```

### スクリーンリーダーテスト

- 実際のスクリーンリーダーでテスト
- キーボードのみで操作可能か確認
