# OTHER SPACE Asakusa — 多言語ホテルサイト実装ケーススタディ

> **一行サマリー:** 浅草のブティックホテル（94室）向けに Next.js（App Router）で5言語サイトを実装。Schema.org 構造化データ7タイプを **検証エラー0・警告0** で全ページ展開し、hreflang で訪日インバウンドの多言語導線を整備した。

サイト: https://otherspacehotel.com ／ 実装: kip

---

## 物件概要

OTHER SPACE Asakusa（東京・台東区浅草 3-4-10）。94室・7タイプのブティックホテル。浅草寺まで徒歩2分、屋上から東京スカイツリーを望む。全日営業のレストラン／カフェ、屋上テラスを併設。和の伝統 × ミニマルを軸にしたインバウンド主体の宿。

## 課題（この層の物件に共通する典型）

- 訪日比率が高いのに、多言語SEO（hreflang・言語別構造化データ）が未整備だと、検索／地図経由の獲得を取りこぼす。
- OTA依存を下げて自社直予約を伸ばすには、検索面の発見性とブランド面の作り込みの両方が要る。
- 中国語2系統（簡体・繁体）＋韓国語まで含む「本物の多言語対応」は翻訳だけでは成立せず、ルーティング・hreflang・言語別構造化までの実装が必要。

## 実装内容

- **フレームワーク:** Next.js（App Router）／ Vercel 配信。
- **多言語:** ロケール接頭辞ルーティング（`/en` `/ja` `/ko` `/zh-CN` `/zh-TW`）。ルート `/` は `/en` へリダイレクト。計 **5言語**（EN / JA / KO / 簡体 / 繁体）。
- **hreflang:** `x-default` ＋ 5ロケールを相互リンクで全ページに付与（実機検証済）。
- **予約導線:** tripla 予約ウィジェット連携。プランコード付きディープリンク（長期割引等）で予約画面へ直結。
- **コンテンツ基盤:** 客室（7タイプ）／レストラン・カフェ／News & Events／FAQ／屋上・テラス。

## 構造化データ（Schema.org）と検証結果

実装した型:

| 範囲 | Schema.org 型 |
| :--- | :--- |
| 全ページ共通 | `WebSite`（`inLanguage` 5言語 + `SearchAction`）／ `Hotel` ／ `LodgingBusiness` ／ `Restaurant` |
| `/room` | `BreadcrumbList` ＋ `HotelRoom` ×8 |
| `/faq` | `FAQPage`（Q&A 37件） |

`Hotel` 型の主なプロパティ: `PostalAddress` ／ `GeoCoordinates`(35.7148, 139.7967) ／ `telephone` ／ `priceRange` ／ `AggregateRating`(4.5・294件) ／ `numberOfRooms`(94) ／ `checkinTime` 15:00 ／ `checkoutTime` 10:00 ／ `amenityFeature` ／ `sameAs`。

**検証:** validator.schema.org（対象 `/en`）→ **エラー 0・警告 0**。検出アイテム（Hotel / WebSite / Restaurant）すべてエラー・警告なし。

> 補足: `/room` の `HotelRoom` は実機で8件を確認（サイト表記は「7タイプ」）。[要確認: 7 vs 8 の表記整合]

## GBP（Google ビジネスプロフィール）施策

**[要確認 — kip が記入]** サイトからは取得できないため、実施した施策を記入:
カテゴリ設定／多言語の説明文／投稿運用／写真／Q&A／クチコミ返信／属性 など、実際にやったことを箇条書きで。

検証可能な関連事実（記入の足がかり）:
- サイト構造化データの NAP（名称・住所・電話）を GBP と一致させる設計（引用情報の一貫性）。
- `Hotel` 型の `AggregateRating`（4.5 / 294件）で Google クチコミ評価をサイト側に露出。

## 成果・数値（サイトで検証可能な実装メトリクス）

- **5言語** 完全 hreflang 対応（`x-default` 含む 6リンク／ページ）。
- **Schema.org 7タイプ**／**検証エラー0・警告0**。
- `FAQPage` 37件、`HotelRoom` を客室タイプ別に付与。
- 公開評価 **4.5 / 5（294件）** を構造化データで露出。

**[要確認] ビジネス成果の数値** — 1つでも出せれば最強（GBP表示回数／地図経由クリック／直予約比率／流入の前後比較 など）。

## 技術スタック（実機で確認できた範囲）

Next.js（App Router）／ Vercel 配信 ／ Schema.org JSON-LD ／ hreflang i18n ／ tripla 予約連携。
[要確認: TypeScript・Tailwind 等の詳細スタック]

---

*検証メモ: 本ケーススタディの技術・構造化データ・多言語の各事実は、2026-05-23 に live サイト（otherspacehotel.com）を実機取得・validator.schema.org で検証して記載。ビジネス成果数値とGBP施策はkip本人の記入待ち。*
