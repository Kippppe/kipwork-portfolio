// 単一情報源（Single source of truth）— コピーはここを編集すれば全セクションに反映される。
// Day5でHeroのポジショニングとProofを精緻化する想定。

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kipwork.jp";

export const CONTACT_EMAIL = "kippeifujita81@gmail.com";

// Web3Forms の公開アクセスキー（Web3Forms 側で「This is a public key」と明記された公開前提のキー）。
// クライアントから直接 api.web3forms.com に送信する。env を設定すればそちらを優先。
// キー変更/失効は Web3Forms ダッシュボードからいつでも可能。
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "2b40ee94-8941-4fee-8d9f-0ddff7c3d419";

export const brand = {
  name: "kip",
  role: "ホテル特化・多言語サイト / Schema 実装",
  tagline: "ホテルの現場が分かる、多言語実装エンジニア。",
};

export const nav = [
  { href: "#case", label: "実績" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "相談する" },
];

export const hero = {
  eyebrow: "ホテル特化・多言語サイト実装",
  headline:
    "訪日インバウンドで“見つかる・伝わる・予約される”ホテルサイトを実装します。",
  subhead:
    "Next.js × Schema.org Hotel × hreflang。EN / JA / KO / 簡体 / 繁体の多言語実装と、検索・地図・AI に最適化した構造化データを、ホテル現場運用の視点で組み立てます。",
  proof: [
    "Schema.org 7型 検証0エラー",
    "5言語 hreflang 完全対応",
    "Next.js App Router 実装",
    "GBP 多言語 MEO 運用",
    "ホテルフロント実務経験",
  ],
  primaryCta: { label: "実装の相談をする", href: "#contact" },
  secondaryCta: { label: "実績を見る", href: "#case" },
};

export const caseStudy = {
  eyebrow: "実装実績 / Case Study",
  title: "OTHER SPACE Asakusa — 多言語ホテルサイト実装",
  summary:
    "浅草のブティックホテル（94室）向けに Next.js（App Router）で5言語サイトを実装。Schema.org 構造化データ7タイプを検証エラー0・警告0で全ページ展開し、hreflang で訪日インバウンドの多言語導線を整備しました。",
  liveUrl: "https://otherspacehotel.com",
  liveLabel: "otherspacehotel.com",
  stats: [
    { value: "5", unit: "言語", label: "EN / JA / KO / 簡体 / 繁体 を hreflang 完全対応" },
    { value: "7", unit: "型", label: "Schema.org 構造化データ — 検証0エラー・0警告" },
    { value: "37", unit: "件", label: "FAQPage として構造化した Q&A" },
    { value: "4.5", unit: "/5（294件）", label: "公開評価を AggregateRating で露出" },
    { value: "21,450", unit: "回 / 6ヶ月", label: "GBP プロフィール操作（ローカル実トラクション）" },
  ],
  implementation: {
    title: "実装内容",
    items: [
      "Next.js（App Router）／ Vercel 配信。ロケール接頭辞ルーティング（/en /ja /ko /zh-CN /zh-TW）。",
      "hreflang は x-default + 5ロケールを相互リンクで全ページに付与（実機検証済）。",
      "Schema.org 7型: WebSite / Hotel / LodgingBusiness / Restaurant（全ページ共通）、BreadcrumbList + HotelRoom（客室）、FAQPage（FAQ）。",
      "tripla 予約エンジン連携。プランコード付きディープリンクで予約画面へ直結。",
      "Google ビジネスプロフィールで多言語クチコミ返信・オーナー Q&A・投稿運用を実施。",
    ],
  },
  validation:
    "validator.schema.org（対象 /en）で検証 → エラー0・警告0。NAP（名称・住所・電話）をサイト構造化データと一致させ、検索・地図・AI 各面の整合を確保。",
};

export const about = {
  eyebrow: "About",
  title: "ホテルの現場が分かる実装者です。",
  lead:
    "現職で浅草のホテル（OTHER SPACE Asakusa）の Web / SEO / オペレーションを担当。フロント実務を通じて、多言語ゲスト対応・予約導線・OTA と直予約の現実を肌で理解しています。その現場感覚を、検索とブランドの両面で効く実装に落とし込みます。",
  pillars: [
    {
      title: "現場運用の視点",
      body: "フロント実務の経験から、ゲストが実際に何でつまずくか・どこで予約を離脱するかを起点に設計します。",
    },
    {
      title: "本物の多言語実装",
      body: "EN / KR / zh-TW / zh-CN。翻訳だけでなく、ロケールルーティング・hreflang・言語別構造化データまで実装します。",
    },
    {
      title: "検索・地図・AI 最適化",
      body: "Next.js + Schema.org Hotel + AIO 構造対応。検索（SEO）・地図（MEO/GBP）・生成AI 各面で見つかる土台をつくります。",
    },
    {
      title: "代理店の黒子として",
      body: "Web 制作代理店からの再委託を前提に、貴社ブランドの裏側で多言語 / 構造化の実装部分を担います。",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "多言語・Schema 実装のご相談",
  lead:
    "ホテル / 宿泊施設の多言語サイト実装、Schema.org 構造化、MEO 整備について、代理店パートナーからのお問い合わせを歓迎します。実装範囲・スコープのすり合わせから対応します。",
  email: CONTACT_EMAIL,
};
