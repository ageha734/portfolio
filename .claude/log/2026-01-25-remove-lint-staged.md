# lint-stagedの脱却

## 作業日時
2026年1月25日

## 目的
lint-stagedを削除し、lefthookに完全に移行する。

## 実施内容

### 1. 現状分析
- `lint-staged`は`lefthook.yaml`のpre-commitフックで使用されていた
- `lint-staged.config.js`に複雑なロジックが実装されていた
- 以下のファイルタイプに対してチェックを実行：
  - `.github/**/*.yml` - GitHub Actionsワークフローファイル
  - `*.{ts,tsx}` - TypeScriptファイル
  - `*.config.js` - 設定ファイル
  - `*.md` - Markdownファイル（wiki内のみ）
  - `*.sh` - シェルスクリプト
  - `*.tsp` - TypeSpecファイル
  - `**/*.test.{ts,tsx}` - テストファイル

### 2. 実装
- `scripts/git/lint-staged-replacement.js`を作成
  - `lint-staged.config.js`のロジックを再利用
  - ステージされたファイルを`git diff --cached --name-only`で取得
  - ファイルパターンに基づいてコマンドを生成・実行
- `lefthook.yaml`を更新
  - `lint-staged`コマンドを`lint-staged-replacement`に置き換え
  - `stage_fixed: true`を維持して自動ステージング機能を保持
- `package.json`から`lint-staged`の依存関係を削除
- `lint-staged.config.js`を削除

### 3. 変更ファイル
- **追加**: `scripts/git/lint-staged-replacement.js`
- **変更**: `lefthook.yaml`
- **変更**: `package.json`
- **削除**: `lint-staged.config.js`

## 検証結果

### フォーマット
- ✅ `bun run fmt`を実行し、コードスタイルを確認

### リンター
- ✅ `bunx biome lint scripts/git/lint-staged-replacement.js`を実行し、エラーなし
- ⚠️ 既存のワークスペース依存関係の問題（vitestバージョン不一致）は今回の変更とは無関係

### 動作確認
- ✅ スクリプトが正常に実行されることを確認
- ✅ ステージされたファイルがない場合の処理を確認
- ✅ デバッグログを削除し、本番用コードにクリーンアップ

## 技術的詳細

### lint-staged-replacement.jsの動作
1. `git diff --cached --name-only`でステージされたファイルを取得
2. ファイルパターンに基づいてファイルを分類
3. 各パターンに対応するハンドラー関数を実行してコマンドを生成
4. 生成されたコマンドを順次実行
5. エラーが発生した場合は終了コード1を返す

### 主な機能
- ワークスペースごとのファイルグループ化
- ソースファイルとテストファイルの関連付け
- フォーマット、リント、テスト、カバレッジ、型チェックの実行

## 今後の課題
- なし（既存のワークスペース依存関係の問題は別途対応が必要）

## 完了
lint-stagedの脱却が完了しました。lefthookのみを使用してpre-commitフックを実行するようになりました。
