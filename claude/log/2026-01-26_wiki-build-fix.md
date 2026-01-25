# Wiki ビルドエラー修正

## 日付
2026-01-26

## 解釈した仕様
`@portfolio/wiki`パッケージのビルドを成功させる。Astro/Starlightベースのドキュメントサイトが正しくビルドできる状態にする。

## 発生していた問題

### 1. フロントマター欠落エラー
- **ファイル**: `docs/database/erd.md`
- **エラー**: `InvalidContentEntryDataError: title: Required`
- **原因**: Astroのコンテンツコレクションスキーマで必須の`title`フロントマターが欠落していた

### 2. インポートパス解決エラー
- **ファイル**: `docs/reports/index.mdx`, `docs/reports/coverage.mdx`
- **エラー**: `Could not resolve "../../../components/reports/ReportList"`
- **原因**: シンボリックリンク経由でコンテンツが参照されているため、相対インポートパスが正しく解決されなかった

### 3. ファイル名不一致
- **ファイル**: `docs/reports/index.mdx`
- **エラー**: `Could not resolve "../../apps/wiki/src/lib/reports/parser"`
- **原因**: 実際のファイル名が`parser.ts`ではなく`e2e-parser.ts`だった

## 変更したファイル

### 1. `docs/database/erd.md`
- フロントマターを追加
```yaml
---
title: "データベース設計書"
---
```

### 2. `docs/reports/index.mdx`
- インポートパスを修正
```diff
- import { ReportList } from "../../../components/reports/ReportList";
- import { getAllProjects, getProjectReports } from "../../../lib/reports/parser";
+ import { ReportList } from "../../apps/wiki/src/components/reports/ReportList";
+ import { getAllProjects, getProjectReports } from "../../apps/wiki/src/lib/reports/e2e-parser";
```

### 3. `docs/reports/coverage.mdx`
- インポートパスを修正
```diff
- import { CoverageList } from "../../../components/reports/CoverageList";
- import { getAllCoverageProjects, getProjectCoverageReports } from "../../../lib/reports/coverage-parser";
+ import { CoverageList } from "../../apps/wiki/src/components/reports/CoverageList";
+ import { getAllCoverageProjects, getProjectCoverageReports } from "../../apps/wiki/src/lib/reports/coverage-parser";
```

## 検証した結果
- `bun run build --filter=@portfolio/wiki` が成功
- 38ページが正常にインデックス化された
- 全ての静的ルートが正常にプリレンダリングされた

## 残っている課題
- `docs/database/erd.md`のフロントマターが再度削除されている可能性がある（linterまたは外部ツールによる変更が検出された）
- シンボリックリンク構造により、`docs/`ディレクトリ内のMDXファイルからのインポートは相対パスで`apps/wiki/src/`を明示的に参照する必要がある

## 技術的な注意点
- `apps/wiki/src/content/docs`は`../../../../docs`へのシンボリックリンク
- エイリアス（`~/`）はシンボリックリンク経由のファイルでは正しく解決されない
- Viteビルド時のパス解決は実際のファイル位置を基準とするため、ルートの`docs/`からの相対パスを使用する必要がある
