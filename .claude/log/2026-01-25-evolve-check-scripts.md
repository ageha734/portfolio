# scripts/checkの進化と統合

## 作業日時
2026年1月25日

## 目的
`scripts/git/check-pulumi-secrets.sh`と`scripts/git/lint-staged-replacement.js`を`scripts/check`に統合し、参考リポジトリ（https://github.com/yub0n/monorepo-lefthook-demo）のパターンを参考にスクリプトを進化させる。

## 実施内容

### 1. 依存関係の追加
- `cac`: CLIフレームワーク
- `picocolors`: カラー出力ライブラリ

### 2. ファイル構造の整理
`scripts/workspace`を参考に、以下のようにファイル分割：

- **`routines/utils.ts`**: ログユーティリティと`LoadingBar`クラス
- **`routines/dispatch.ts`**: パッケージごとのディスパッチロジック（参考リポジトリのパターン3を実装）
- **`routines/staged.ts`**: ステージされたファイルのチェック（lint-staged-replacement.jsの機能）
- **`routines/pulumi.ts`**: Pulumiシークレットチェック（check-pulumi-secrets.shの機能）
- **`cmd/main.ts`**: CLIエントリーポイント（cacを使用）

### 3. 主な機能

#### `check staged`
- ステージされたファイルに対してlint-stagedのロジックを適用
- ファイルパターンに基づいてコマンドを生成・実行
- ローディングバーで処理時間を可視化

#### `check pulumi-secrets`
- Pulumi設定ファイルにシークレットが含まれていないかチェック
- `doppler:dopplerToken`と`secure:`パターンを検出

#### `check dispatch <command>`
- パッケージごとにファイルをグループ化
- 各パッケージの`package.json`で定義されたスクリプトを実行
- 並列実行をサポート（`--no-parallel`で無効化可能）

### 4. 変更ファイル
- **追加**:
  - `scripts/check/routines/utils.ts`
  - `scripts/check/routines/dispatch.ts`
  - `scripts/check/routines/staged.ts`
  - `scripts/check/routines/pulumi.ts`
- **変更**:
  - `scripts/check/cmd/main.ts`
  - `scripts/check/package.json`
  - `lefthook.yaml`
- **削除**:
  - `scripts/git/check-pulumi-secrets.sh`
  - `scripts/git/lint-staged-replacement.js`

### 5. lefthook.yamlの更新
```yaml
pre-commit:
    parallel: true
    commands:
        check-pulumi-secrets:
            run: bun scripts/check/dist/cmd/main.js pulumi-secrets
            tags: infra
        check-staged:
            run: bun scripts/check/dist/cmd/main.js staged
            stage_fixed: true
```

## 技術的詳細

### LoadingBarの実装
- `scripts/workspace/routines/env.ts`の`LoadingBar`クラスを再利用
- コマンド実行中はログを出力せず、ローディングバーで処理時間を可視化
- 完了時に成功/失敗メッセージを表示

### パッケージディスパッチの実装
- 参考リポジトリの`dispatch-by-package.js`のロジックをTypeScriptで実装
- ファイルから最も近い`package.json`を探索
- パッケージごとにファイルをグループ化
- 各パッケージのスクリプトを並列または順次実行

### ビルド設定
- `bun build`を使用してバイナリーとしてビルド
- `dist/cmd/main.js`に出力
- 実行可能ファイルとして設定（`chmod +x`）

## 検証結果

### ビルド
- ✅ `bun run build`が正常に完了
- ✅ バイナリーファイルが生成される

### フォーマットとリンター
- ✅ `bun run fmt`を実行し、コードスタイルを確認
- ✅ `bun run lint`を実行し、エラーなし

### CLI動作確認
- ✅ `--help`オプションでヘルプが表示される
- ✅ 各コマンドが正常に動作する

## 今後の課題
- なし（すべての機能が正常に動作）

## 完了
scripts/checkの進化と統合が完了しました。すべての機能がバイナリーとして利用可能になり、ローディングバーで処理時間が可視化されるようになりました。
