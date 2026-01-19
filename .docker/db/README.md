# MySQL Docker Container for Portfolio Development

このディレクトリには、開発環境用のMySQL 8.0 Dockerコンテナの設定が含まれています。

## ファイル構成

- **Dockerfile**: MySQL 8.0のDockerイメージ定義
- **my.cnf**: MySQL設定ファイル（パフォーマンスとログ設定）
- **init.sql**: データベース初期化スクリプト
- **seed/**: シードデータ用SQLファイル（開発環境用のサンプルデータ）
  - `02-seed-user.sql`: ユーザーデータ
  - `03-seed-tags.sql`: タグデータ
  - `04-seed-posts.sql`: 投稿データ
  - `05-seed-post-tags.sql`: 投稿とタグの関連データ
  - `06-seed-portfolios.sql`: ポートフォリオデータ
  - `07-seed-user-experiences.sql`: ユーザー経験データ
  - `08-seed-user-socials.sql`: ユーザーソーシャルデータ
- **.dockerignore**: Dockerビルド時に除外するファイル
- **scripts/backup.sh**: データベースバックアップスクリプト
- **scripts/restore.sh**: データベースリストアスクリプト

## 使用方法

### イメージのビルド

```bash
docker build -t db -f .docker/db/Dockerfile .docker/db
```

### コンテナの起動

```bash
docker run -d \
  --name db \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=portfolio \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  -v db-data:/var/lib/mysql \
  db
```

### 環境変数

以下の環境変数で設定をカスタマイズできます：

- `MYSQL_ROOT_PASSWORD`: rootユーザーのパスワード（デフォルト: `rootpassword`）
- `MYSQL_DATABASE`: 作成するデータベース名（デフォルト: `portfolio`）
- `MYSQL_USER`: アプリケーションユーザー名（デフォルト: `user`）
- `MYSQL_PASSWORD`: アプリケーションユーザーのパスワード（デフォルト: `password`）
- `TZ`: タイムゾーン（デフォルト: `UTC`）

### データの永続化

データはDockerボリューム `db-data` に保存されます。

### ログの確認

```bash
# エラーログ
docker exec db tail -f /var/log/mysql/error.log

# スロークエリログ
docker exec db tail -f /var/log/mysql/slow.log

# 一般クエリログ
docker exec db tail -f /var/log/mysql/general.log
```

### データベースへの接続

```bash
# rootユーザーで接続
docker exec -it db mysql -u root -prootpassword

# アプリケーションユーザーで接続
docker exec -it db mysql -u user -ppassword portfolio
```

### ヘルスチェック

コンテナのヘルスステータスを確認：

```bash
docker ps --filter name=db --format "table {{.Names}}\t{{.Status}}"
```

### バックアップとリストア

#### バックアップ

スクリプトを使用する場合：

```bash
# デフォルトのバックアップ名（タイムスタンプ付き）
.docker/db/scripts/backup.sh

# カスタムバックアップ名を指定
.docker/db/scripts/backup.sh my-backup

# 環境変数で設定をカスタマイズ
CONTAINER_NAME=db \
MYSQL_ROOT_PASSWORD=rootpassword \
MYSQL_DATABASE=portfolio \
BACKUP_DIR=./backups \
.docker/db/scripts/backup.sh
```

または、直接mysqldumpを使用：

```bash
docker exec db mysqldump -u root -prootpassword portfolio > backup.sql
```

#### リストア

スクリプトを使用する場合：

```bash
.docker/db/scripts/restore.sh backup.sql

# 圧縮されたバックアップファイルの場合
.docker/db/scripts/restore.sh backup.sql.gz

# 環境変数で設定をカスタマイズ
CONTAINER_NAME=db \
MYSQL_ROOT_PASSWORD=rootpassword \
MYSQL_DATABASE=portfolio \
.docker/db/scripts/restore.sh backup.sql
```

または、直接mysqlを使用：

```bash
docker exec -i db mysql -u root -prootpassword portfolio < backup.sql
```

### コンテナの停止と削除

```bash
# コンテナを停止
docker stop db

# コンテナを削除（データは保持）
docker rm db

# データも削除する場合
docker volume rm db-data
```

## 設定の詳細

### MySQL設定（my.cnf）

- **文字セット**: UTF-8MB4（絵文字対応）
- **タイムゾーン**: UTC
- **ログ**: 一般クエリログ、スロークエリログ、エラーログを有効化
- **InnoDB**: 1GBバッファプール、パフォーマンス最適化
- **セキュリティ**: 厳格なSQLモード、シンボリックリンク無効化

### パフォーマンス設定

- 最大接続数: 200
- InnoDBバッファプール: 1GB
- スロークエリ閾値: 2秒
- インデックス未使用クエリもログに記録

## トラブルシューティング

### コンテナが起動しない

```bash
# ログを確認
docker logs db

# コンテナの状態を確認
docker ps -a --filter name=db
```

### ポートが既に使用されている

別のポートを使用：

```bash
docker run -d --name db -p 3307:3306 ...
```

### データが消えた

ボリュームが削除されていないか確認：

```bash
docker volume ls | grep db-data
```

## セキュリティ注意事項

⚠️ **この設定は開発環境用です。本番環境では以下を実施してください：**

- 強力なパスワードの使用
- rootユーザーのリモートアクセス無効化
- SSL/TLS接続の強制
- ファイアウォール設定
- 定期的なバックアップ
- セキュリティ監査ログの有効化
