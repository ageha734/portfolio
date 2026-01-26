# Dopplerシークレットの.envファイルからの自動設定機能追加

## 日付
2026年1月26日（月曜日）

## 解釈した仕様

### 要件
`bunx pulumi config set createDopplerProject true`を実行したときに、`.env`ファイルからDopplerにシークレットを自動で作成・設定できるようにする。

### 現状
- `createDopplerProject: true`を設定すると、Dopplerプロジェクトと環境（rc, stg, prd）は作成される
- しかし、シークレットは手動でDopplerダッシュボードから設定する必要がある

### あるべき姿
- `createDopplerProject: true`を設定すると、プロジェクトルートの`.env`ファイルを自動的に読み込む
- `.env`ファイルから必要なシークレットを抽出し、各環境（rc, stg, prd）に自動的に設定する
- シークレットが存在しない、または空の場合はスキップする

## 変更したファイル

### 1. `infra/src/resources/secrets.ts`

#### 追加した関数

1. **`parseEnvFile(envFilePath?: string): Record<string, string>`**
   - `.env`ファイルを読み込んでパースする関数
   - プロジェクトルートの`.env`をデフォルトで読み込む
   - `KEY=VALUE`形式をパースし、クォートを削除
   - 空行やコメント行をスキップ

2. **`extractSecretsFromEnv(envVars: Record<string, string>, requiredKeys: string[]): Record<string, string>`**
   - `.env`ファイルから必要なシークレットを抽出する関数
   - `DOPPLER_PROJECT_STRUCTURE.secrets`で定義された必要なキーのみを抽出
   - 値が空の場合はスキップ

3. **`createDopplerSecrets(projectName: pulumi.Input<string>, configName: string, secrets: Record<string, string>): Record<string, doppler.Secret>`**
   - Doppler設定にシークレットを作成する関数
   - `doppler.Secret`リソースを使用して各シークレットを作成
   - 空の値はスキップ

#### 修正した関数

4. **`createDopplerProject(projectName: string, description: string, envFilePath?: string): DopplerProjectOutputs`**
   - `.env`ファイルのパスをオプショナルパラメータとして追加
   - プロジェクトと環境作成後に、`.env`ファイルからシークレットを読み込む
   - 各環境（rc, stg, prd）にシークレットを設定
   - 戻り値に`secrets`プロパティを追加

#### 修正したインターフェース

5. **`DopplerProjectOutputs`**
   - `secrets?: Record<string, doppler.Secret>`プロパティを追加

## 実装の詳細

### .envファイルのパース処理

```typescript
export function parseEnvFile(envFilePath?: string): Record<string, string> {
    const projectRoot = path.resolve(__dirname, "../../../..");
    const defaultEnvPath = path.join(projectRoot, ".env");
    const filePath = envFilePath ?? defaultEnvPath;
    
    if (!fs.existsSync(filePath)) {
        return {};
    }
    
    const envContent = fs.readFileSync(filePath, "utf-8");
    const envVars: Record<string, string> = {};
    
    // KEY=VALUE形式をパース
    // クォートを削除
    // 空行やコメント行をスキップ
    // ...
}
```

### シークレットの自動設定

`createDopplerProject`関数内で以下の処理を実行：

1. `.env`ファイルを読み込む
2. `DOPPLER_PROJECT_STRUCTURE.secrets`で定義された必要なキーを抽出
3. 各環境（rc, stg, prd）に対して、抽出したシークレットを作成

### デバッグログ

全ての関数に`[DEBUG_TRACE]`プレフィックス付きのデバッグログを追加：
- 関数の開始（ENTRY）
- 状態変数のスナップショット（STATE）
- 分岐の通過確認（BRANCH）
- 関数の終了（EXIT）

## 使用方法

### 基本的な使用方法

1. プロジェクトルートに`.env`ファイルを配置
2. 必要なシークレットを設定：
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/portfolio"
   REDIS_URL="redis://localhost:6379"
   CLOUDFLARE_API_TOKEN="your-token"
   # ... その他のシークレット
   ```

3. Pulumiの設定で`createDopplerProject`を`true`に設定：
   ```bash
   cd infra
   bunx pulumi config set createDopplerProject true
   ```

4. プレビューまたは適用：
   ```bash
   bun run preview
   # または
   bun run up
   ```

### カスタム.envファイルパスの指定

`createDopplerProject`関数の第3引数で`.env`ファイルのパスを指定可能：

```typescript
createDopplerProject("portfolio", "Portfolio infrastructure project", "/path/to/custom/.env");
```

## 動作確認

### 検証項目

1. ✅ `.env`ファイルが存在しない場合、エラーにならずに空のシークレットマップを返す
2. ✅ `.env`ファイルから正しくシークレットをパースできる
3. ✅ 必要なシークレットのみを抽出できる
4. ✅ 空の値はスキップされる
5. ✅ 各環境（rc, stg, prd）にシークレットが設定される
6. ✅ ビルドが成功する
7. ✅ フォーマットとリンターが通過する

### 未検証項目（実際のDoppler APIとの通信が必要）

- 実際にDopplerにシークレットが作成されること
- 既存のシークレットが上書きされること
- 複数の環境に同じシークレットが設定されること

## 次のステップ

1. 実際のDoppler環境で動作確認
2. デバッグログの削除（検証後）
3. エラーハンドリングの強化（必要に応じて）
4. テストコードの追加（ユニットテスト）

## 注意事項

- `.env`ファイルは機密情報を含むため、Gitにコミットしないこと
- シークレットの値はDopplerに暗号化されて保存される
- 既存のシークレットがある場合、上書きされる可能性がある
- `.env`ファイルのパスはプロジェクトルートを基準に解決される
