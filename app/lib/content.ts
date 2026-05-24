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
  { href: "#proof", label: "技術力" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "相談する" },
];

export const hero = {
  eyebrow: "ホテル特化・多言語サイト実装",
  headline:
    "訪日インバウンドで“見つかる・伝わる・予約される”ホテルサイトを実装します。",
  // Day5 確定: 本文＝代理店（買い手）への適合性＋スコープ＋差別化（70字）。成果はheadlineが担うため非重複。
  subhead:
    "Web制作代理店の黒子として、ホテルの多言語サイトとSchema・MEOを実装。検索・地図・AIに効く構造を、現場運用の視点で組み立てます。",
  // Day5 確定: proof 5本 各15字以内。on-axisで強く自己検証可能なもののみ。
  proof: [
    "Schema7型・0エラー",
    "hreflang 5言語対応",
    "Next.js+AIO構造",
    "GBP多言語MEO運用",
    "ホテルフロント実務",
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

// 技術力証明セクション（Day4）。主張ではなく「第三者が再現できる検証可能性」で示す。
// 数値・型はすべて実測（validator.schema.org / PageSpeed Insights）。捏造なし。
export const techProof = {
  eyebrow: "技術力証明 / Proof",
  title: "主張ではなく、検証可能性で示す。",
  lead:
    "下記の証拠はすべて公開ソースとライブ検証ツールで第三者が再確認できます。スクリーンショットは結果、リンクはその再現手段です。",

  schema: {
    title: "Schema.org 構造化データ — 全ページ エラー0・警告0",
    body:
      "JSON-LD で7型を宣言し、全ページを validator.schema.org で検証。3ページとも エラー0・警告0で通過しています。",
    // 「カード6個では？」という几帳面な相手を先回りで封じるキャプション。
    caption:
      "JSON-LD で7型を宣言（WebSite / Hotel / LodgingBusiness / Restaurant / BreadcrumbList / HotelRoom / FAQPage）。validator はカード表示で LodgingBusiness を Hotel のサブタイプに統合するため、表示上は6種になります。",
    pages: [
      {
        path: "/en/room",
        count: 12,
        highlight: "HotelRoom ×8 + BreadcrumbList",
        img: "/proof/schema-room.png",
        star: true,
      },
      {
        path: "/en",
        count: 3,
        highlight: "WebSite / Hotel / Restaurant",
        img: "/proof/schema-en.png",
        star: false,
      },
      {
        path: "/en/faq",
        count: 4,
        highlight: "+ FAQPage",
        img: "/proof/schema-faq.png",
        star: false,
      },
    ],
    verify: [
      {
        label: "Rich Results Test で再検証（/en）",
        href: "https://search.google.com/test/rich-results?url=https%3A%2F%2Fotherspacehotel.com%2Fen",
      },
      {
        label: "Schema Markup Validator（/en/room）",
        href: "https://validator.schema.org/#url=https%3A%2F%2Fotherspacehotel.com%2Fen%2Froom",
      },
    ],
    self:
      "このポートフォリオ自身も ProfessionalService 型で構造化済み（View Source で確認可）。",
  },

  hreflang: {
    title: "hreflang — 5言語 + x-default を全ページ相互リンク",
    body:
      "ロケール接頭辞ルーティング（/en /ja /ko /zh-CN /zh-TW）。各ページが x-default を含む全ロケールを相互参照し、検索エンジンに言語シグナルを明示します。",
    locales: ["x-default", "en", "ja", "ko", "zh-CN", "zh-TW"],
    // 実装パターン（実機は View Source で確認可）。
    code: `<link rel="alternate" hreflang="x-default" href="https://otherspacehotel.com/en" />
<link rel="alternate" hreflang="en"        href="https://otherspacehotel.com/en" />
<link rel="alternate" hreflang="ja"        href="https://otherspacehotel.com/ja" />
<link rel="alternate" hreflang="ko"        href="https://otherspacehotel.com/ko" />
<link rel="alternate" hreflang="zh-CN"     href="https://otherspacehotel.com/zh-CN" />
<link rel="alternate" hreflang="zh-TW"     href="https://otherspacehotel.com/zh-TW" />`,
  },

  // 差別化軸＝検索。Lighthouse は検索最適化に直結する SEO / Best Practices のみ掲示。
  metrics: {
    title: "Lighthouse — 検索最適化カテゴリ",
    target: "otherspacehotel.com（モバイル・PageSpeed Insights 実測）",
    items: [
      { label: "SEO", value: 100 },
      { label: "Best Practices", value: 96 },
    ],
    note:
      "構造化データ・メタ・hreflang の最適化を、検索に直結する SEO 100 / Best Practices 96 で裏付け。PageSpeed Insights で誰でも再計測できます。",
  },
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
