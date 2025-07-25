# CLAUDE.md

このファイルは、AI Driven Dev Starter Kit (AI駆動開発スターターキット) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## プロジェクト概要

**AI Driven Dev Starter Kit** - AI駆動開発用のテンプレート管理とスケルトン生成ツール

このプロジェクトは、AI駆動開発プロジェクトの効率的な開始と管理を支援するためのテンプレート集とツール群です。

## 技術スタック

完全な技術スタックの定義と根拠については `docs/architecture/tech-stack.md` を参照してください。

### 主要技術
- **TypeScript**: スクリプトツールの開発
- **Node.js**: CLIツールの実行環境
- **Markdown**: ドキュメントとテンプレート
- **Docker**: コンテナ化サポート（オプション）

## アーキテクチャ

### 概要
```
templates/ → scripts/ → 生成されたプロジェクト
    ↓           ↓
  テンプレート  処理ツール
```

### 主要コンポーネント
- **テンプレート層**: `templates/` - プロジェクト構造、プロンプト、アーキテクチャテンプレート
- **処理層**: `scripts/` - テンプレート処理とスケルトン生成ツール
- **ドキュメント層**: `docs/` - プロジェクトドキュメント
- **設定層**: `config/` - プロジェクト設定

## 開発哲学

### 基本原則
- **テンプレート駆動開発**: 再利用可能なテンプレートベースの開発
- **自動化**: 手動作業の最小化とツールによる効率化
- **標準化**: 一貫したプロジェクト構造と開発プロセス
- **ドキュメント化**: 明確で包括的なドキュメント
- **拡張性**: 新しいテンプレートとツールの追加が容易

## 主要機能

### コア機能
1. **プロジェクトスケルトン生成**: CLI、Web、APIプロジェクトの基本構造生成
2. **テンプレート管理**: プロジェクト構造、プロンプト、アーキテクチャテンプレート
3. **プロジェクトカスタマイズ**: 既存プロジェクトの設定とカスタマイズ
4. **ドキュメント生成**: プロジェクト固有のドキュメント自動生成

### 将来の機能
- より多くのプロジェクトタイプのサポート
- クラウドインフラテンプレート
- CI/CDパイプラインテンプレート
- セキュリティテンプレート

## セキュリティとコンプライアンス

### セキュリティ対策
- **テンプレート検証**: 生成されるコードの安全性確保
- **依存関係管理**: 安全なパッケージバージョンの使用
- **設定ファイル保護**: 機密情報の適切な管理

### コンプライアンス考慮事項
- **オープンソースライセンス**: MITライセンス準拠
- **ドキュメント標準**: 明確な利用規約とガイドライン

## 開発ワークフロー

### 現在の状況
- **フェーズ**: テンプレート整理とツール改善
- **スプリント**: 機能整理とドキュメント統一
- **マイルストーン**: 安定版リリース準備

### アクティブな開発
1. テンプレート構造の最適化
2. スクリプトツールの機能改善
3. ドキュメントの統一と改善

## 進捗管理ルール

### 必須ファイル更新
AIエージェントは以下のファイルを最新に保つ必要があります：

1. **PROGRESS.md** - 開発進捗の追跡
   - 各タスク完了後に更新
   - 完了したタスク、現在の作業、次のタスクを文書化
   - 日付とタイムスタンプを含める

2. **DEVELOPMENT_ROADMAP.md** - 開発ロードマップ
   - フェーズの進行に応じて更新
   - 完了したマイルストーンにチェックマークを付ける
   - 新しい課題や変更を反映

### 更新タイミング
- 機能実装完了時
- 重要な設定変更後
- フェーズ移行時
- バグ修正や改善後
- 新しい技術的決定時

### 更新方法
1. 作業完了直後に該当ファイルを更新
2. 具体的な成果物と変更を文書化
3. 次のステップを明確化
4. コミットメッセージに進捗更新を含める

## プロジェクト固有の開発ルール

### Gitワークフロー

#### ブランチ戦略
- **メインブランチ**: `main`
- **機能ブランチ**: `feature/task-description`
- **バグ修正ブランチ**: `fix/bug-description`

#### 必須作業手順
すべての開発作業で以下の手順に従ってください：

1. 機能要件を定義し、`docs/` に文書化
2. **作業ブランチを作成し、git worktreeで分離**
3. 期待される入力と出力に基づいてテストを作成
4. テストを実行し、失敗を確認
5. テストを通過するコードを実装
6. すべてのテストが通過したらリファクタリング
7. 進捗ファイル（PROGRESS.md、DEVELOPMENT_ROADMAP.md）を更新

#### Worktreeの使用方法
```bash
# 必須手順
git checkout main && git pull origin main
git checkout -b feature/task-name
git worktree add ../project-feature ./feature/task-name
```

### ディレクトリ構造

- `templates/`: プロジェクトテンプレート
  - `project-structures/`: プロジェクト構造テンプレート
  - `prompts/`: Claude Code用プロンプトテンプレート
  - `architectures/`: アーキテクチャテンプレート
  - `tools/`: 開発ツールテンプレート
- `scripts/`: テンプレート処理とスケルトン生成ツール
- `docs/`: プロジェクトドキュメント
- `config/`: プロジェクト設定
- `.claude/`: Claude Code設定

### コーディング標準

#### ファイル命名規則
- **TypeScriptファイル**: `camelCase.ts`
- **テンプレートファイル**: `kebab-case.md.template`
- **設定ファイル**: `kebab-case.json`
- **テストファイル**: `*.test.ts`
- **型定義**: `*.types.ts`

#### 品質チェックリスト
実装完了前に以下を確認：
- `npm run build` (TypeScriptコンパイル)
- `npm run lint` (ESLint)
- テンプレートの動作確認
- ドキュメントの更新

### テンプレート開発ガイドライン

#### テンプレート作成原則
- 再利用可能で汎用的な設計
- 明確なプレースホルダー使用
- 適切なドキュメント化
- テスト可能な構造

#### テンプレート検証
- プレースホルダーの正しい置換
- 生成されるファイルの整合性
- 依存関係の適切な管理

### 禁止される実践

以下の実践は厳禁です：
- テストなしでの機能実装
- メインブランチでの直接作業
- シークレットや認証情報のハードコーディング
- 既存テンプレートの破壊的変更
- 承認なしでの外部依存関係の追加
- ドキュメント更新のスキップ
- PROGRESS.mdとDEVELOPMENT_ROADMAP.md更新の無視

### 実装後チェックリスト
- [ ] すべてのテストが通過
- [ ] TypeScriptコンパイルが成功
- [ ] リンティングが通過
- [ ] ドキュメントが更新済み
- [ ] テンプレートが正常に動作
- [ ] PROGRESS.mdが完了したタスクと次のタスクで更新済み

## PRDベース開発フロー

このプロジェクトはPRD（Product Requirements Document）ベースの開発フローを採用しています。

### 基本フロー

1. **PRD.md完成**: 開発者がプロダクト要件を詳細に記述
2. **Claude起動**: 開発環境でClaude Codeを起動
3. **自動アレンジ指示**: 「PRD.mdの内容に基づいてプロジェクトのスケルトンをアレンジして」
4. **実装**: Claudeが要件に応じてファイル構造・実装を最適化

### Claude AIへの指示（PRD解析・実装）

プロジェクトにPRD.mdが存在する場合、以下の手順で対応してください：

#### 1. PRD分析フェーズ
```
PRD.mdを詳細に読み込み、以下を分析してください：
- プロダクトビジョン・ミッション
- ユーザーストーリー・ユースケース  
- 機能要件（MVP vs Future）
- 技術要件・制約条件
- 成功指標・KPI
```

#### 2. アーキテクチャ設計フェーズ
```
PRDの要件に基づき、最適なアーキテクチャを設計してください：
- ディレクトリ構造の最適化
- 技術スタックの確認・調整
- データモデル設計
- API設計（該当する場合）
- セキュリティ・パフォーマンス考慮
```

#### 3. 実装計画フェーズ
```
段階的な実装計画を立ててください：
- MVP機能の特定・優先順位付け
- 実装順序の決定
- 依存関係の整理
- リスク事項の特定
```

#### 4. スケルトン生成フェーズ
```
PRD要件に適合するスケルトンコードを生成してください：
- 必要なファイル・ディレクトリの作成
- 基本実装の追加（インターフェース、型定義等）
- 設定ファイルの調整
- ドキュメントの更新
```

#### 5. 開発ガイダンス
```
継続開発のためのガイダンスを提供してください：
- 実装時の注意事項
- テスト戦略
- デプロイ手順
- 運用・監視のポイント
```

### プロジェクトタイプ別の考慮事項

#### MCP Server
- MCP仕様準拠の確認
- Tools/Resources/Promptsの適切な設計
- JSON-RPC 2.0通信の実装
- エラーハンドリング・ログ出力

#### Web (Next.js)
- ページ構造・ルーティング設計
- コンポーネント設計
- 状態管理戦略
- API Routes設計

#### API (FastAPI)
- エンドポイント設計
- データモデル・バリデーション
- 認証・認可設計
- OpenAPI仕様書生成

#### CLI (Rust)
- コマンド構造設計
- 引数・オプション定義
- エラーハンドリング
- パフォーマンス最適化

### 品質保証

PRDベース開発では以下を確認してください：
- [ ] PRD要件の完全な理解・反映
- [ ] MVP機能の適切な特定・実装
- [ ] 技術的制約の考慮
- [ ] 拡張性・保守性の確保
- [ ] ドキュメント・コメントの充実

## 思考タグ定義

Claudeと人間が協働する際に使用する「思考タグ（メタコマンド）」の定義を記述しています。Claudeはこのタグ群に従い、深く・広く・批判的かつ持続的な推論を行うことが求められます。

### 🎯 グローバルマクロタグ

#### `#deepthink`
- 全ての思考タグを一括で有効にします。
- 相当するタグ群：#meta, #flip, #zoomout, #drilldown, #retry, #slowthink, #assumptioncheck, #nooutput, #keepgoing

---

### 🧠 思考促進タグ一覧

| タグ名              | 意図           | 行動指針 |
|---------------------|----------------|-----------|
| `#meta`             | 問いの問い直し | 現在の問いが適切かどうかを検討し、再定義する。 |
| `#flip`             | 逆視点思考     | 現在の視点と正反対の立場で再検討する。 |
| `#zoomout`          | 視野の拡張     | 問題の全体構造や目的に立ち返る。 |
| `#drilldown`        | 構造の深掘り   | 表層の議論を一段階掘り下げて考察する。 |
| `#retry`            | 再構築・再挑戦 | アプローチを変えて再検討する。 |
| `#slowthink`        | 遅く考える     | 安易な結論を避け、推論を丁寧に進める。 |
| `#assumptioncheck`  | 前提精査       | 暗黙の前提・仮定を洗い出し、再評価する。 |
| `#nooutput`         | 思考の可視化   | 結論を出さず、思考の過程を記述することに集中。 |
| `#keepgoing`        | 粘り強く継続   | 思考を途中で止めず、模索を続ける。 |

## 記憶ログ

### 開発ワークフロー関連メモ
- 今後も PROGRESS.md 更新を忘れないでね。save といったらコミット、push、PREGRESS.md 更新までセットだよ。