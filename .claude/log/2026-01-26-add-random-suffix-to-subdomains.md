# サブドメインにランダムな文字列を追加する機能の実装

## 日付
2026-01-26

## タスク概要
workersとpagesを作成する際、ドメインがブッキングしている場合にCloudflareが自動で追加するランダムな文字列（例：`aaa`）がDNSレコードに反映されない問題を解決するため、admin、wiki、web、apiに関しては、プロジェクト名にランダムな文字列を追加し、そのサブドメインをDNSレコードに登録するように修正しました。

## 解釈した仕様

### 問題点
- Cloudflare PagesやWorkersを作成する際、既に使用されているサブドメイン名の場合、Cloudflareが自動的にランダムな文字列（例：`aaa`）を追加する
- 例：`portfolio-admin.pages.dev`が使用不可の場合、`portfolio-admin-aaa.pages.dev`になる
- 現在の実装では、DNSレコードに固定の`${projectName}-admin.pages.dev`を登録しているため、実際に生成されたサブドメインと一致しない

### 解決策
- `admin`、`wiki`、`web`、`api`のプロジェクト名に、事前にランダムな文字列（6文字）を追加する
- 実際に生成されたサブドメインを取得し、DNSレコードに登録する

## 変更したファイル

### 1. `infra/src/resources/pages.ts`
- `@pulumi/random`をインポート
- `generateRandomSuffix`関数を追加（6文字のランダムな文字列を生成）
- `PagesOutputs`インターフェースに`subdomains`フィールドを追加
- `createPagesProjects`関数で、各プロジェクトのサブドメインを生成し、`customDomain`をキーとして`subdomains`に保存
- `createPortfolioPagesProjects`関数で、`admin`、`wiki`、`web`のプロジェクト名にランダムな文字列を追加
- `PagesProjectConfig`の`name`フィールドの型を`pulumi.Input<string>`に変更（ランダムな文字列を含むため）

### 2. `infra/src/resources/workers.ts`
- `@pulumi/random`をインポート
- `generateRandomSuffix`関数を追加
- `WorkersOutputs`インターフェースに`subdomains`フィールドを追加
- `createWorkers`関数で、各workerのサブドメインを生成し、`subdomains`に保存
- `createPortfolioApiWorker`関数で、`api`のworker名にランダムな文字列を追加し、サブドメインを生成

### 3. `infra/src/resources/dns.ts`
- `createPortfolioDnsRecords`関数のシグネチャを変更し、`pagesSubdomains`と`workerSubdomains`パラメータを追加
- 実際のサブドメインを取得してDNSレコードに登録するように修正
- `api`のDNSレコードも追加

### 4. `infra/src/index.ts`
- `pagesProjects`と`workers`の作成を`dnsRecords`の作成より前に移動
- `createPortfolioDnsRecords`呼び出し時に、`pagesProjects.subdomains`と`workers.subdomains`を渡すように修正

## 検証結果

### ビルド
- TypeScriptのコンパイルが成功
- 型エラーなし

### フォーマット
- Biomeフォーマッターが正常に実行され、問題なし

### リンター
- Biomeリンターが正常に実行され、問題なし

## 実装の詳細

### ランダムな文字列の生成
- `@pulumi/random`の`RandomString`リソースを使用
- 6文字の小文字英数字（`lower: true`, `numeric: true`, `special: false`, `upper: false`）

### サブドメインのキー
- Pagesプロジェクト：`customDomain`（`www`、`admin`、`wiki`）をキーとして使用
- Workers：`resourceName`（例：`worker-{projectName}-api`）をキーとして使用

### DNSレコードの作成順序
1. Pagesプロジェクトの作成（ランダムな文字列を含むプロジェクト名で）
2. Workersの作成（ランダムな文字列を含むworker名で）
3. DNSレコードの作成（実際のサブドメインを参照）

## 残っている課題
なし

## 備考
- デバッグログは実装後に削除済み
- 既存の機能への影響を最小限に抑えるため、`pagesSubdomains`と`workerSubdomains`はオプショナルパラメータとして実装
- フォールバック機能として、サブドメインが提供されない場合はデフォルトのサブドメインを使用
