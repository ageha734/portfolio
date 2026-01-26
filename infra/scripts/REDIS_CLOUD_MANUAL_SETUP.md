# Redis Cloud ダッシュボードでの手動作成手順

このドキュメントでは、Redis Cloudダッシュボードを使用してサブスクリプションとデータベースを手動で作成する手順を説明します。

## 重要: Redis Cloud API経由での作成について

**Redis Cloudのサブスクリプション作成APIは、年間プランまたはエンタープライズプランでのみ利用可能です。**

無料プランや月額プランを使用している場合、以下のいずれかの方法を選択してください：

1. **Redis Cloudの作成をスキップする**（推奨）:
   - Pulumi設定で`skipRedisCloud: true`を設定
   - `.env`ファイルに`REDIS_URL`を設定（外部のRedisサービスを使用）
   - 詳細は「[Redis Cloudの作成をスキップする](#redis-cloudの作成をスキップする)」を参照

2. **ダッシュボードで手動作成する**:
   - このドキュメントの手順に従って、ダッシュボードで手動作成
   - 作成後、`pulumi import`を実行してPulumiで管理

## 前提条件

- [Redis Cloud](https://app.redislabs.com/) アカウントにログイン済み
- APIキー（`REDISCLOUD_ACCESS_KEY`と`REDISCLOUD_SECRET_KEY`）が設定済み（手動作成の場合のみ）

## 手順1: サブスクリプションの作成

1. [Redis Cloud](https://app.redislabs.com/) にログイン

2. 左側のメニューから「**Subscriptions**」を選択

3. 「**+ New Subscription**」または「**Create Subscription**」をクリック

4. サブスクリプション設定を入力：

   - **Subscription Name**: `portfolio-subscription`（任意の名前）
   - **Cloud Provider**: `AWS`を選択
   - **Region**: `ap-northeast-1`（東京）を選択
   - **Memory Storage**: `RAM`を選択
   - **Plan**: `Essentials`を選択
   - **Memory Limit**: `30 MB`（無料プラン）または希望のサイズ

5. 「**Create Subscription**」をクリック

6. サブスクリプションが作成されるまで数分待機

## 手順2: データベースの作成

1. 作成したサブスクリプションをクリックして詳細を表示

2. 「**Databases**」タブを選択

3. 「**+ New Database**」または「**Create Database**」をクリック

4. データベース設定を入力：

   - **Database Name**: `portfolio-cache`（任意の名前）
   - **Protocol**: `Redis`を選択
   - **Memory Limit**: `30 MB`（無料プランの場合）
   - **Data Persistence**: `None`を選択
   - **Replication**: `Disabled`（無料プランの場合）
   - **Throughput**: `1000 operations/second`（無料プランの場合）

5. 「**Create Database**」をクリック

6. データベースが作成されるまで数分待機

## 手順3: 接続情報の取得

1. 作成したデータベースをクリックして詳細を表示

2. 「**Connect**」タブまたは「**Configuration**」タブを選択

3. 以下の情報をコピー：

   - **Public Endpoint**: `host:port`形式（例: `redis-12345.redis.cloud:12345`）
   - **Password**: データベースのパスワード（表示されない場合は「**Show Password**」をクリック）

4. 接続文字列を構築：

   ```bash
   redis://:password@host:port
   ```

   例:

   ```bash
   redis://:your-password@redis-12345.redis.cloud:12345
   ```

## 手順4: サブスクリプションIDとデータベースIDの確認

### サブスクリプションIDの確認

1. サブスクリプションの詳細ページを表示
2. URLからIDを確認（例: `https://app.redislabs.com/#/subscriptions/12345678` → IDは`12345678`）
3. または、サブスクリプション一覧でID列を確認

### データベースIDの確認

1. データベースの詳細ページを表示
2. URLからIDを確認（例: `https://app.redislabs.com/#/subscriptions/12345678/databases/87654321` → IDは`87654321`）
3. または、データベース一覧でID列を確認

## 手順5: .envファイルにIDを設定

手動で作成したサブスクリプションとデータベースのIDを`.env`ファイルに追加します。

### ステップ1: .envファイルに追加

プロジェクトルートの`.env`ファイルに以下を追加：

```env
REDISCLOUD_SUBSCRIPTION_ID=<subscription-id>
REDISCLOUD_DATABASE_ID=<database-id>
REDIS_URL=redis://:password@host:port
```

**例**:

```env
REDISCLOUD_SUBSCRIPTION_ID=12345678
REDISCLOUD_DATABASE_ID=87654321
REDIS_URL=redis://:your-password@redis-12345.redis.cloud:12345
```

### ステップ2: Dopplerに同期

`.env`ファイルの内容をDopplerに同期：

```bash
cd infra
pulumi up
```

これにより、`.env`ファイルの`REDISCLOUD_SUBSCRIPTION_ID`と`REDISCLOUD_DATABASE_ID`がDopplerに自動的に同期されます。

## 手順6: Pulumiで既存リソースをインポート

**重要**: `.env`ファイルに`REDISCLOUD_SUBSCRIPTION_ID`と`REDISCLOUD_DATABASE_ID`を設定した後、**必ず**`pulumi import`を実行してください。これを行わないと、Pulumiが新規作成を試みてエラーが発生します。

### ステップ1: サブスクリプションIDとデータベースIDを確認

1. **サブスクリプションIDの確認**:
   - サブスクリプションの詳細ページを表示
   - URLからIDを確認（例: `https://app.redislabs.com/#/subscriptions/12345678` → IDは`12345678`）
   - または、サブスクリプション一覧でID列を確認

2. **データベースIDの確認**:
   - データベースの詳細ページを表示
   - URLからIDを確認（例: `https://app.redislabs.com/#/subscriptions/12345678/databases/87654321` → IDは`87654321`）
   - または、データベース一覧でID列を確認

### ステップ2: .envファイルにIDを設定

確認したIDを`.env`ファイルに追加（手順5を参照）。

**例**:

```env
REDISCLOUD_SUBSCRIPTION_ID=1234567
REDISCLOUD_DATABASE_ID=12345678
REDIS_URL=redis://:password@host:port
```

### ステップ3: 環境変数を設定してPulumi importを実行（必須）

`.env`ファイルにIDを設定した後、**必ず**`pulumi import`を実行してください。これを行わないと、Pulumiが新規作成を試みてエラーが発生します。

**重要**: `pulumi import`を実行する際は、Redis Cloudの認証情報を環境変数として設定する必要があります。

```bash
# infraディレクトリに移動
cd infra

# 適切なスタックを選択（例: rc）
pulumi stack select rc

# .envファイルから環境変数を読み込む（プロジェクトルートから実行）
# または、手動で環境変数を設定
export REDISCLOUD_ACCESS_KEY="<your-access-key>"
export REDISCLOUD_SECRET_KEY="<your-secret-key>"

# サブスクリプションをインポート
# 形式: pulumi import <resource-type> <resource-name> <resource-id>
pulumi import rediscloud:index/subscription:Subscription portfolio-redis-subscription <subscription-id>

# データベースをインポート
# 形式: pulumi import <resource-type> <resource-name> <resource-id>
pulumi import rediscloud:index/subscriptionDatabase:SubscriptionDatabase portfolio-redis-db <database-id>
```

**または、`.env`ファイルを読み込んでから実行**:

```bash
# プロジェクトルートから実行
cd infra

# .envファイルを読み込む（zshの場合）
set -a
source ../.env
set +a

# スタックを選択
pulumi stack select rc

# インポートを実行
pulumi import rediscloud:index/subscription:Subscription portfolio-redis-subscription <subscription-id>
pulumi import rediscloud:index/subscriptionDatabase:SubscriptionDatabase portfolio-redis-db <database-id>
```

**例**（`.env`ファイルに`REDISCLOUD_SUBSCRIPTION_ID=1234567`と`REDISCLOUD_DATABASE_ID=12345678`が設定されている場合）:

```bash
# プロジェクトルートから実行
cd infra

# .envファイルを読み込む（zshの場合）
# これにより、REDISCLOUD_ACCESS_KEYとREDISCLOUD_SECRET_KEYが環境変数として設定されます
set -a
source ../.env
set +a

# スタックを選択
pulumi stack select rc

# インポートを実行
pulumi import rediscloud:index/subscription:Subscription portfolio-redis-subscription 1234567
pulumi import rediscloud:index/subscriptionDatabase:SubscriptionDatabase portfolio-redis-db 12345678
```

**注意**: `.env`ファイルを読み込むと、`REDISCLOUD_ACCESS_KEY`と`REDISCLOUD_SECRET_KEY`が環境変数として設定されます。これらは`pulumi import`を実行する際に必要です。

**注意**:
- `pulumi import`を実行すると、Pulumiが既存リソースの状態を読み取り、コードと同期します。インポート後は、コードで定義された設定が既存リソースに適用されます。
- `.env`ファイルを読み込むと、`REDISCLOUD_ACCESS_KEY`と`REDISCLOUD_SECRET_KEY`が環境変数として設定されます。これらは`pulumi import`を実行する際に必要です。

### ステップ4: 接続文字列をDopplerに設定

データベースの接続情報を取得し、Dopplerに設定：

```bash
# 接続文字列をDopplerに設定（rc環境の場合）
doppler secrets set REDIS_URL="redis://:password@host:port" --project portfolio --config rc
```

または、`.env`ファイルに追加してから同期：

```env
REDIS_URL=redis://:password@host:port
```

### ステップ5: Pulumi upを実行

`pulumi import`を実行した後、`pulumi up`を実行して状態を確認：

```bash
pulumi up
```

**重要**: `pulumi import`を実行する前に`pulumi up`を実行すると、Pulumiが新規作成を試みて`400 BAD_REQUEST`エラーが発生します。必ず`pulumi import`を先に実行してください。

### 注意事項

- **`pulumi import`を実行すると、既存のリソースがPulumiの管理下に入ります**
- インポート後は、Pulumiコードでリソースを変更できるようになります
- インポート前に、必ずバックアップを取ることを推奨します
- **`.env`ファイルにIDを設定しただけでは不十分です。必ず`pulumi import`を実行してください**
- `pulumi import`を実行しない場合、Pulumiは新規作成を試みて`400 BAD_REQUEST`エラーが発生します
- インポート後、コードでリソースの設定を変更すると、次回の`pulumi up`で変更が適用されます

### トラブルシューティング

#### エラー: "resource already exists"

- 既にPulumiで管理されているリソースをインポートしようとしている可能性があります
- `pulumi stack`で現在のスタックを確認し、正しいスタックでインポートを実行してください

#### エラー: "resource not found"

- サブスクリプションIDまたはデータベースIDが正しいか確認してください
- Redis Cloudダッシュボードでリソースが存在するか確認してください

## 注意事項

- 無料プラン（30MB Essentials）の場合、1アカウントあたり1つのデータベースのみ作成可能
- 既存のサブスクリプション/データベースがある場合、それを使用するか削除してから新規作成
- 接続文字列（`REDIS_URL`）は機密情報のため、Dopplerに保存してください

## トラブルシューティング

### エラー: "You already have a free database"

- 無料プランでは1アカウントあたり1つのデータベースのみ作成可能
- 既存のデータベースを削除するか、有料プランにアップグレードしてください

### エラー: "Subscription not found"

- サブスクリプションIDが正しいか確認してください
- 別のアカウントで作成したサブスクリプションを参照していないか確認してください

### エラー: "400 BAD_REQUEST - BAD_REQUEST: Bad request detected"

- **原因**: `.env`ファイルに`REDISCLOUD_SUBSCRIPTION_ID`と`REDISCLOUD_DATABASE_ID`を設定したが、`pulumi import`を実行していない
- **解決方法**: 必ず`pulumi import`を実行してください

  ```bash
  cd infra
  # 環境変数を設定
  set -a && source ../.env && set +a
  pulumi stack select rc
  pulumi import rediscloud:index/subscription:Subscription portfolio-redis-subscription <subscription-id>
  pulumi import rediscloud:index/subscriptionDatabase:SubscriptionDatabase portfolio-redis-db <database-id>
  ```

### エラー: "401 - Authentication error: Authentication failed for provided credentials"

- **原因**: `pulumi import`を実行する際に、Redis Cloudの認証情報が環境変数として設定されていない
- **解決方法**: `pulumi import`を実行する前に、環境変数を設定してください

  ```bash
  # 方法1: .envファイルを読み込む（zshの場合）
  set -a
  source .env
  set +a

  # 方法2: 手動で環境変数を設定
  export REDISCLOUD_ACCESS_KEY="<your-access-key>"
  export REDISCLOUD_SECRET_KEY="<your-secret-key>"

  # その後、pulumi importを実行
  cd infra
  pulumi stack select rc
  pulumi import rediscloud:index/subscription:Subscription portfolio-redis-subscription <subscription-id>
  pulumi import rediscloud:index/subscriptionDatabase:SubscriptionDatabase portfolio-redis-db <database-id>
  ```

- **確認方法**: `verify.ts`スクリプトを実行して、認証情報が有効か確認してください

  ```bash
  cd infra
  bun run verify
  ```

### 接続できない

- ファイアウォール設定を確認してください
- パブリックエンドポイントが正しいか確認してください
- パスワードが正しいか確認してください

## Redis Cloudの作成をスキップする

年間プランまたはエンタープライズプランでない場合、Redis Cloudのサブスクリプション作成をスキップできます。

### ステップ1: Pulumi設定でスキップフラグを設定

```bash
cd infra
pulumi stack select rc
pulumi config set skipRedisCloud true
```

### ステップ2: .envファイルにREDIS_URLを設定

外部のRedisサービス（例: Upstash、AWS ElastiCacheなど）を使用する場合、`.env`ファイルに`REDIS_URL`を設定：

```env
REDIS_URL="redis://:password@host:port"
```

### ステップ3: Pulumi upを実行

```bash
pulumi up
```

これにより、Redis Cloudのリソース作成がスキップされ、`REDIS_URL`がそのまま使用されます。

### 注意事項

- `skipRedisCloud: true`を設定すると、Redis Cloudのサブスクリプションとデータベースの作成がスキップされます
- `REDIS_URL`が設定されている場合、その値が使用されます
- `REDIS_URL`が設定されていない場合、空文字列が使用されます
- 後でRedis Cloudを使用する場合は、`skipRedisCloud: false`に設定し直してください
