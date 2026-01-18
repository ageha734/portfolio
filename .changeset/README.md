# Changesets

このモノレポでは、[Changesets](https://github.com/changesets/changesets) を使用してパッケージのバージョン管理とリリースを行います。

## 使い方

### Changeset の作成

変更を加えたパッケージに対して、changeset を作成します：

```bash
bunx changeset
```

対話形式で以下を選択します：

1. 変更を加えたパッケージを選択
2. バージョンアップの種類（major / minor / patch）を選択
3. 変更内容を記述

### Changeset の確認

作成された changeset は `.changeset/` ディレクトリに保存されます。内容を確認してからコミットしてください。

### バージョンアップとリリース

```bash
# バージョンアップ（CHANGELOG も自動生成）
bun run version
# または
bunx changeset version

# パッケージの公開（このプロジェクトは private なので通常は使用しない）
bun run release
# または
bunx changeset publish
```

## モノレポ特有の設定

- **内部依存関係の更新**: `updateInternalDependencies: "patch"` により、内部パッケージ間の依存関係は自動的にパッチバージョンで更新されます
- **プライベートパッケージ**: すべてのパッケージは `private: true` のため、バージョン管理のみを行い、公開は行いません
- **全パッケージ対象**: モノレポ内のすべてのパッケージ（`apps/*`、`packages/*`、`tooling/*`、`scripts/*`、`testing/*`、`generators`）が changeset の対象です
- **自動コミット**: `commit: true` により、バージョンアップ時に変更が自動的にコミットされます
- **ルートCHANGELOG**: `bun run version` を実行すると、各パッケージのCHANGELOG.mdを集約してルートレベルの `CHANGELOG.md` が自動生成されます
- **カスタムチャンジェログジェネレーター**: GitHubのコミット情報やPR情報を自動的に取得してCHANGELOGに含めます

詳細は [Changesets のドキュメント](https://github.com/changesets/changesets/blob/main/docs/common-questions.md) を参照してください。
