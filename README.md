# Todo アプリ フロントエンド README

このプロジェクトでは、フロントエンドは Next.js/React を使用し、バックエンドは JSON Server を使用して簡易な Todo アプリを構築します。REST API の作り方とフロントエンドの連携を学ぶ初心者向けの内容です。

バックエンドのリポジトリ
https://github.com/Shuheitkhs/todo-api

## プロジェクト概要

- **フロントエンド**: Next.js/React を使って UI を構築します。
- **バックエンド**: JSON Server を使って簡易的な REST API を提供します。

このプロジェクトを通じて、フロントエンドから REST API を呼び出す方法を学び、CRUD（作成、読み取り、更新、削除）の基本的な操作を体験します。

## 環境セットアップ

### 前提条件

- Node.js がインストールされていること。
- Git がインストールされていること。

### リポジトリのクローン

1. GitHub からフロントエンドのリポジトリをクローンします。
   ```bash
   git clone https://github.com/Shuheitkhs/todo-app-node
   cd todo-app-node
   ```
2. GitHub からバックエンドのリポジトリをクローンします。
   ```bash
   git clone https://github.com/Shuheitkhs/todo-api
   cd todo-api
   ```

### 依存関係のインストール

- プロジェクトの依存関係をインストールします。
  ```bash
  npm install
  ```

### 環境変数の設定

- フロントエンドからバックエンドの API にアクセスするために、`.env.local` ファイルをプロジェクトのルートに作成します。
  ```
  NEXT_PUBLIC_API_URL=http://localhost:4000
  ```
  - この URL は JSON Server が起動しているアドレスとポートを指しています。

### 開発サーバーの起動

- フロントエンドの開発サーバーを起動します。
  ```bash
  npm run dev
  ```
- ブラウザで `http://localhost:3000` にアクセスし、Todo アプリを確認できます。

## 機能説明

- **Todo の追加**: フォームから新しい Todo を追加します。
- **Todo の表示**: JSON Server から取得した Todo をリスト表示します。
- **Todo の更新**: Todo の状態（完了/未完了）を更新します。
- **Todo の削除**: 不要な Todo を削除します。

## よくあるエラーと対処法

1. **API が見つからない**

   - `.env.local` ファイルで設定した `NEXT_PUBLIC_API_URL` が正しいか確認してください。

2. **ポートがすでに使用されています**
   - フロントエンドの開発サーバーが起動しない場合、`3000` ポートが既に使用中の可能性があります。別のポートで起動するには以下のコマンドを使用してください。
   ```bash
   PORT=3001 npm run dev
   ```

## 今後の学習ポイント

- このアプリを使って、REST API とフロントエンドのやり取りを理解できたと思います。
- 次回は、このアプリを Vercel や Render などを使ってデプロイし、誰でもアクセスできるようにする予定です。

## 貢献

このプロジェクトは自由にフォークして学習用途で使用してください。改善点があればプルリクエストを歓迎します！

## ライセンス

MIT ライセンスのもとで公開しています。
