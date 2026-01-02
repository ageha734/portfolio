# Architecture Overview

このプロジェクトは、Remix + Cloudflare Pagesベースのポートフォリオサイトです。

## Feature-Sliced Design (FSD)

このプロジェクトは、Feature-Sliced Design (FSD) アーキテクチャを採用しています。

### レイヤー構造

- **app/**: アプリケーションエントリーポイント
- **pages/**: ページレイヤー
- **widgets/**: 大きなUIブロック
- **features/**: ユーザー機能
- **entities/**: ドメインモデル
- **shared/**: 共通リソース

### インポートルール

FSDのインポートルールに従い、上位レイヤーから下位レイヤーへのみインポート可能です。
