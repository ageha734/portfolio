# Project Structure

## ディレクトリ構造

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

## 各レイヤーの説明

### app/

アプリケーションのエントリーポイント（`root.tsx`, `entry.client.tsx`, `entry.server.tsx`）を配置します。

### pages/

各ページ（画面）を構築します。Remixの`routes/`ディレクトリに対応します。

### widgets/

ページ内で使用される自己完結型の大きなUIブロックを管理します。

### features/

ユーザー視点で意味のある機能（例：検索、投稿、設定など）を表します。

### entities/

アプリケーションのドメインに関わるデータモデル（例：ユーザー、商品など）を管理します。

### shared/

全体で再利用可能なUIコンポーネントやユーティリティを配置します。
