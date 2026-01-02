# Setup

## 前提条件

- Node.js 20.11.0以上
- Bun 1.1.43以上

## インストール

```bash
# 依存関係のインストール
bun install

# 環境変数の設定
cp .env.example .env
```

## 開発サーバーの起動

```bash
# Remix開発サーバー
bun run dev:remix

# Ladle UI
bun run dev:ui

# 両方同時に起動
bun run dev
```

## ビルド

```bash
bun run build
```
