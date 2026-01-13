---
alwaysApply: true
---

# プロジェクトルール

このプロジェクトのアーキテクチャとテスト方針については、`CLAUDE.md`を参照してください。

## 重要なルール

- 機能追加時: 必ずテストコードを記載する
- 機能修正時: `bun run test`を実行して既存テストが通ることを確認する
- テストコード変更: なるべく変更しない。変更が必要な場合は理由を説明し、合意を求める

## アーキテクチャの概要

- Monorepo構造: Turborepo + Bun Workspaces
- Web: Feature-Sliced Designベース
- API: Domain-Driven Designベース
- スクリプト実行: `turbo run`コマンドを使用してワークスペース全体で実行

詳細は`CLAUDE.md`を参照してください。
