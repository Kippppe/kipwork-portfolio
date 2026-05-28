# Reduce-motion フォールバック改善：BuildingToJsonLd

- 日付: 2026-05-27
- 対象: `app/components/BuildingToJsonLd.tsx`
- ステータス: 設計承認済み（実装計画前）

## 背景・問題

`BuildingToJsonLd` は「物理ホテル(SVG) → JSON-LD」へのスクロール連動 morph。サービス中核
（物理ホテルを構造化データに翻訳する）を視覚化する。

`prefers-reduced-motion: reduce` のユーザーには、現状 `progress` を `1` に固定して最終状態を
表示している。しかし morph は **建物 → ラベル → コードを受け渡し**で見せる設計のため、どの
`progress` 値でも 3 要素が同時にフル表示にならない（建物=1 は progress<0.45、ラベル=1 は
0.22–0.78、コード全表示は progress>0.82 で重ならない）。結果、reduce 時は次の状態になる:

- 建物 opacity ≈ 0.06（ほぼ消失）
- ラベル opacity = 0（**非表示**）
- コード全行 = 表示

つまり「建物パーツ ↔ JSON-LD プロパティ」の**対応関係を伝えるラベルがちょうど隠れ**、
reduce ユーザー（および Reduce Motion を ON にしている開発者本人）は中核メッセージを体験できない。
さらに desktop では reduce 時もスクラブしないのに `260svh` の sticky 余白が残り、無駄に長いスクロールが発生する。

## ゴール

reduce-motion のユーザーが、**動きなしで**「物理ホテル → 構造化データ」の対応関係を理解できる
静的な完成図を見られるようにする。

## 非ゴール（スコープ外）

- 通常（reduce OFF）の scroll-linked morph は**一切変更しない**。
- 建物パーツ／ラベルから JSON-LD のコード行への結線・ハイライトは作らない（今回はラベルで対応を示す）。
- ホバー／タップ連動などのインタラクションは追加しない。
- 既知の framer-motion hydration mismatch 警告（サイト全体・別件）はここでは扱わない。

## 設計

### reduce 時にユーザーが見るもの
- 建物（完全表示・opacity 1）＋ 全ラベル（name / starRating / numberOfRooms / address /
  makesOffer / @type、すべて opacity 1）＋ 完成 JSON-LD（全行表示）を**一画面に静的同時表示**。
- ラベル名＝ JSON-LD プロパティ名なので、対応が一目で伝わる。
- desktop: 左=注釈付き建物 / 右=JSON-LD の 2 カラム（現状レイアウト踏襲）。mobile: 縦積み。

### アプローチ（承認済み：案1＝既存部品の再利用）
`BuildingSvg` / `CodeLine` に「静的フル表示モード」を追加し、reduce 時は `useTransform`
（progress 連動）を使わず opacity を直接固定する。

- `BuildingToJsonLd`: `const reduce = useReducedMotion()` を分岐の起点にする。
  - `reduce === true` のとき、`reduced` フラグを `BuildingSvg` と `CodeBlock`(→`CodeLine`) に渡す。
  - `progress`（MotionValue）は非 reduce 時のみ使用。reduce 時は子コンポーネントが progress を参照しない。
- `BuildingSvg({ progress, reduced })`:
  - `reduced` のとき: 建物グループ opacity = 1、ラベルグループ opacity = 1（固定）。
  - 非 reduced: 現状の `bodyOpacity` / `labelOpacity` の `useTransform` を維持。
- `CodeLine({ ..., progress, reduced })`:
  - `reduced` のとき: opacity = 1、x = 0（スライドなし、全行表示）。
  - 非 reduced: 現状の `useTransform` を維持。

> 実装メモ: Hooks のルールを守るため `useTransform` は常に呼び出した上で、`reduced` のとき
> だけ固定値（定数 MotionValue もしくは素の style 値）を `style` に適用する分岐にする。
> 条件付きで Hook を呼ばないことは避ける。

### レイアウト／挙動
- **sticky 余白の撤去（reduce 時）**: desktop の `height: 260svh` ＋ `sticky` ラッパーは reduce 時には使わず、
  既存 `<section>` の `min-height: 100svh` の中で**通常フロー**（コンテンツ高に追従）の静的セクションとして
  2 カラム表示する。`260svh` の高さも `position: sticky` も reduce 時は付与しない。
  非 reduce 時は現状どおり `260svh` ＋ sticky pin を維持。
- mobile は現状どおり通常フロー。reduce 時に静的フル表示（建物＋ラベル＋コード）。
- **軽いフェードイン（reduce で許容、動きなし）**: 静的コンポジション**全体のコンテナ単位**で、
  ビューポート入り時に **opacity のみ**のフェードを 1 回付与（位置移動・scale・スクロール連動・
  per-element stagger は付けない）。実装は CSS の `@starting-style` もしくは IntersectionObserver による
  opacity トランジション（短時間、例: 300–500ms）。

### コンポーネント境界（変更後の責務）
- `BuildingToJsonLd`（コンテナ）: reduce 判定、レイアウト分岐（static / scroll-pin）、`reduced` と
  `progress` の受け渡し。
- `BuildingSvg`: 建物＋ラベル SVG の描画。`reduced` で静的フル表示、非 reduced で progress 連動。
- `CodeBlock` / `CodeLine`: JSON-LD 描画。`reduced` で全行静的表示、非 reduced で stagger。
- `DebugHud`: 変更なし（`NEXT_PUBLIC_DEBUG=1` 時のみ）。

## 検証

- **reduce ON**（ローカル headless プレビューは既定で reduce=true なのでそのまま検証可）:
  - 建物 opacity=1、全ラベル opacity=1、コード全行表示。
  - desktop で 260svh の余白スクロールが無いこと（静的セクション高さ）。
  - opacity のみの軽いフェードが入り、位置移動が無いこと。
  - mobile（375px 等）でも建物＋ラベル＋コードが静的表示。
- **reduce OFF**: scroll morph が従来どおり（sticky pin、260svh、建物→ラベル→コードの受け渡し）であること。
  ＝ 非 reduce パスに差分が無いことを確認。
- `tsc --noEmit` パス。
- 本番デプロイ後、reduce ON の実機で「建物＋ラベル＋コード」が見えることを確認。

## リスク・留意点

- Hooks 順序: `useTransform` を条件分岐で呼び分けない（常に呼ぶ）。
- フェードの IntersectionObserver / `@starting-style` がブラウザ差で過剰にならないよう、opacity のみ・短時間。
- reduce 時にレイアウトを別経路にすることで、mobile/desktop の表示崩れがないか要確認。
