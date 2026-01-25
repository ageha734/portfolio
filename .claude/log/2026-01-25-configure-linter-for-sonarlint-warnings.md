# SonarLint警告をBiome/TypeScriptで検知する設定の追加

## 作業日時
2026年1月25日

## 目的
SonarLintで検出されていたエラーや警告を、`typecheck`や`biome`でも検知できるように設定を見直す。

## 実施内容

### 1. Biome設定の更新（`tooling/biome/base.json`）

#### Cognitive Complexityの検出
- `noExcessiveCognitiveComplexity`ルールを追加
  - レベル: `error`
  - 最大許容複雑度: `15`（SonarLintと同じ）
  - これにより、関数の複雑度が15を超える場合にエラーが検出される

#### 未使用インポートの検出
- `noUnusedImports`ルールを追加
  - レベル: `error`
  - 未使用のインポートを検出

### 2. TypeScript設定の更新（`tooling/tsconfig/base.json`）

#### 未使用変数・パラメータの検出
- `noUnusedLocals`: `true`に変更
  - 未使用のローカル変数を検出
- `noUnusedParameters`: `true`に変更
  - 未使用の関数パラメータを検出

### 3. コードの修正

#### `scripts/check/routines/dispatch.ts`
- `runPackageCommand`関数の未使用パラメータ`repoRoot`を`_repoRoot`に変更

#### `scripts/check/routines/staged.ts`
- `runCommand`関数の未使用パラメータ`loadingBar`を削除
- `runStaged`関数内で`loadingBar`を直接使用するように変更

## 検出可能になった問題

### Biomeで検出可能
1. **Cognitive Complexity（複雑度）**
   - 関数の複雑度が15を超える場合にエラー
   - SonarLintの`S3776`と同等

2. **未使用インポート**
   - インポートされているが使用されていないモジュールを検出
   - SonarLintの`S1128`と同等

3. **未使用変数**
   - 既存の`noUnusedVariables`ルールで検出
   - SonarLintの`S1481`と同等

### TypeScriptで検出可能
1. **未使用ローカル変数**
   - `noUnusedLocals`で検出
   - SonarLintの`S1481`と同等

2. **未使用パラメータ**
   - `noUnusedParameters`で検出
   - SonarLintの`S1172`と同等

## 検出できない問題（現時点）

以下の問題は、BiomeやTypeScriptの標準設定では検出できません：

1. **正規表現の演算子優先順位**
   - SonarLintの`S5850`
   - BiomeやTypeScriptには直接的なルールがない
   - 手動レビューまたはカスタムルールが必要

2. **`replace` vs `replaceAll`**
   - SonarLintの`S7781`
   - Biomeには直接的なルールがない
   - 手動レビューまたはカスタムルールが必要

## 変更ファイル

- **変更**: `tooling/biome/base.json`
  - `noExcessiveCognitiveComplexity`ルールを追加
  - `noUnusedImports`ルールを追加
- **変更**: `tooling/tsconfig/base.json`
  - `noUnusedLocals`: `true`に変更
  - `noUnusedParameters`: `true`に変更
- **変更**: `scripts/check/routines/dispatch.ts`
  - 未使用パラメータを修正
- **変更**: `scripts/check/routines/staged.ts`
  - 未使用パラメータを削除

## 検証結果

### Biome
- ✅ `bun run lint`が正常に実行される
- ✅ Cognitive Complexityルールが有効になっている
- ✅ 未使用インポートが検出される

### TypeScript
- ✅ `bun run typecheck`が正常に実行される
- ✅ 未使用変数・パラメータが検出される
- ✅ 既存のコードで未使用の変数・パラメータを修正

## 今後の課題

1. 正規表現の演算子優先順位の検出
   - Biomeのカスタムルール作成を検討
   - または、ESLintプラグインの導入を検討

2. `replace` vs `replaceAll`の検出
   - Biomeのカスタムルール作成を検討
   - または、ESLintプラグインの導入を検討

## 完了
SonarLintで検出されていた主要な問題（Cognitive Complexity、未使用変数・インポート）を、BiomeとTypeScriptの設定で検知できるようになりました。
