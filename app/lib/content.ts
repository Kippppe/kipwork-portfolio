// 単一情報源（Single source of truth）— コピーはここを編集すれば全セクションに反映される。

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kipwork.jp";

export const CONTACT_EMAIL = "kippeifujita81@gmail.com";

export const brand = {
  name: "kip",
  initials: "K",
  role: "ホテル特化・多言語サイト / Schema 実装",
};

// SNS / 外部リンク（差し替えてください）
export const social = {
  github: "https://github.com/Kippppe",
  x: "https://x.com/kipwork_jp",
  note: "https://note.com/kipwork_0107",
  linkedin: "", // 空ならフッターから自動で除外
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#connect", label: "Contact" },
];

// HERO ─ 大胆タイポでホテル特化×代理店黒子を打ち出す
// 中央行は5言語で循環。サイト自身が hreflang を演じる self-referential 演出。
export const hero = {
  eyebrow: "Hotel-specialized · Multilingual web",
  headlineEn: [
    "I build",
    "multilingual hotel sites", // ← この行は MultilingualHeadline で循環表示される
    "that get found.",
  ],
  // 中央行の多言語版。同じ意味を5言語で表記。
  headlineCycle: [
    { lang: "en",    text: "multilingual hotel sites", hreflang: "en" },
    { lang: "ja",    text: "多言語ホテルサイト",         hreflang: "ja" },
    { lang: "ko",    text: "다국어 호텔 사이트",          hreflang: "ko" },
    { lang: "zh-CN", text: "多语言酒店网站",            hreflang: "zh-CN" },
    { lang: "zh-TW", text: "多語言飯店網站",            hreflang: "zh-TW" },
  ],
  // 各言語の表示秒数 / 切替アニメ秒数
  cycleDwell: 2.6,
  cycleSwap: 0.55,
  headlineJa:
    "ホテルの現場が分かる、多言語実装エンジニア。",
  subhead:
    "Web制作代理店の黒子として、ホテルの多言語サイトと Schema・MEO を実装。検索・地図・AI に効く構造を、現場運用の視点で組み立てます。",
  proof: [
    "Schema 7型 0エラー",
    "hreflang 5言語",
    "Next.js + AIO構造",
    "GBP 多言語MEO",
    "ホテルフロント実務",
  ],
  primaryCta: { label: "実装の相談をする", href: "#connect" },
  secondaryCta: { label: "実績を見る", href: "#work" },
};

// ABOUT
export const about = {
  eyebrow: "About",
  title: "ホテル現場とコードを\n両方知っている、数少ない実装者。",
  // /public/me.jpg にファイルを置けば自動で表示される
  portrait: "/me.jpg",
  body: [
    "現職で浅草のホテル（OTHER SPACE Asakusa）の Web / SEO / オペレーションを担当。フロント実務を通じて、多言語ゲスト対応・予約導線・OTA と直予約の現実を肌で理解しています。",
    "翻訳屋でも純粋なエンジニアでもありません。両方の言語を持つから、検索とブランドの両面で効く実装に落とし込めます。",
    "Web制作代理店の黒子として、貴社ブランドの裏側で多言語/構造化の実装部分を担います。",
  ],
  skills: [
    "Next.js",
    "TypeScript",
    "App Router",
    "Tailwind",
    "Schema.org",
    "hreflang",
    "JSON-LD",
    "GBP / MEO",
    "GA4",
    "Vercel",
    "Cloudflare",
    "i18n (EN/JA/KO/zh-CN/zh-TW)",
    "Hotel ops",
    "Front desk",
  ],
};

// WORK
export const work = {
  eyebrow: "Selected Work",
  title: "実装実績",
  projects: [
    {
      slug: "otherspace",
      title: "OTHER SPACE Asakusa",
      subtitle: "多言語ホテルサイト実装（5言語 / Schema 7型）",
      year: "2025",
      role: "Web / SEO / 実装",
      cover: "/work/otherspace.png",
      tech: ["Next.js", "App Router", "Schema.org", "hreflang", "tripla"],
      stats: [
        { value: "5", label: "言語" },
        { value: "7", label: "Schema型" },
        { value: "0", label: "Validatorエラー" },
      ],
      url: "https://otherspacehotel.com",
      summary:
        "94室のブティックホテル向けに Next.js (App Router) で5言語サイトを実装。Schema.org 7タイプを検証エラー0で全ページ展開、hreflang で訪日インバウンドの多言語導線を整備。",
    },
  ],
};

export const techProof = {
  eyebrow: "Proof",
  title: "主張ではなく、検証可能性で示す。",
  lead:
    "下記の証拠はすべて公開ソースとライブ検証ツールで第三者が再確認できます。スクリーンショットは結果、リンクはその再現手段です。",
  schema: {
    title: "Schema.org — 全ページ エラー0・警告0",
    body:
      "JSON-LD で7型を宣言し、全ページを validator.schema.org で検証。3ページとも エラー0・警告0で通過しています。",
    caption:
      "JSON-LD で7型を宣言（WebSite / Hotel / LodgingBusiness / Restaurant / BreadcrumbList / HotelRoom / FAQPage）。validator はカード表示で LodgingBusiness を Hotel のサブタイプに統合するため、表示上は6種になります。",
    pages: [
      { path: "/en/room", count: 12, highlight: "HotelRoom ×8 + BreadcrumbList", img: "/proof/schema-room.png", star: true },
      { path: "/en", count: 3, highlight: "WebSite / Hotel / Restaurant", img: "/proof/schema-en.png", star: false },
      { path: "/en/faq", count: 4, highlight: "+ FAQPage", img: "/proof/schema-faq.png", star: false },
    ],
    verify: [
      { label: "Rich Results Test で再検証（/en）", href: "https://search.google.com/test/rich-results?url=https%3A%2F%2Fotherspacehotel.com%2Fen" },
      { label: "Schema Markup Validator（/en/room）", href: "https://validator.schema.org/#url=https%3A%2F%2Fotherspacehotel.com%2Fen%2Froom" },
    ],
    self: "このポートフォリオ自身も ProfessionalService 型で構造化済み（View Source で確認可）。",
  },
  hreflang: {
    title: "hreflang — 5言語 + x-default を全ページ相互リンク",
    body:
      "ロケール接頭辞ルーティング（/en /ja /ko /zh-CN /zh-TW）。各ページが x-default を含む全ロケールを相互参照し、検索エンジンに言語シグナルを明示します。",
    locales: ["x-default", "en", "ja", "ko", "zh-CN", "zh-TW"],
    code: `<link rel="alternate" hreflang="x-default" href="https://otherspacehotel.com/en" />
<link rel="alternate" hreflang="en"        href="https://otherspacehotel.com/en" />
<link rel="alternate" hreflang="ja"        href="https://otherspacehotel.com/ja" />
<link rel="alternate" hreflang="ko"        href="https://otherspacehotel.com/ko" />
<link rel="alternate" hreflang="zh-CN"     href="https://otherspacehotel.com/zh-CN" />
<link rel="alternate" hreflang="zh-TW"     href="https://otherspacehotel.com/zh-TW" />`,
  },
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

// EXPERIENCE ─ 縦タイムライン（プレースホルダ）。差し替えてください。
export const experience = {
  eyebrow: "Experience",
  title: "経歴",
  items: [
    {
      period: "2023 — 2025",
      role: "Marketing & Sales",
      org: "Canada Toronto",
      summary: "カナダ留学にて Marketing & Sales を専攻。マーケティング、営業、消費者分析、ビジネス戦略を学習。多文化環境でのプロジェクトワークを通じ、英語でのコミュニケーション力とビジネス理解を強化。",
      tags: ["Marketing Strategy","Sales","Business Communication","Cross-cultural Collaboration"],
    },
    {
      period: "2025 — 2026",
      role: "LP / SEO / コンテンツマーケティング Intern",
      org: "Aied",
      summary: "インターンとしてブログコンテンツ作成、営業補佐、LP作成、SEO施策を担当。Webコンテンツ運用とマーケティング支援を通じ、集客・情報発信業務に従事。",
      tags: ["LP Creation", "SEO", "Content Writing", "Sales Support"],
    },
    {
      period: "2025 — 現在",
      role: "Web / SEO / オペレーション",
      org: "OTHER SPACE Asakusa",
      summary:
        "94室ブティックホテルの自社サイト実装・運用、SEO/MEO/AIO戦略、フロント実務。多言語実装と GBP 運用で訪日インバウンド導線を整備。",
      tags: ["Next.js", "Schema.org", "GBP", "Front desk"],
    },
  ],
};

// CONNECT
export const connect = {
  eyebrow: "Get in touch",
  bigText: "LET'S CONNECT",
  lead:
    "ホテル / 宿泊施設の多言語サイト実装、Schema.org 構造化、MEO 整備について、代理店パートナーからのお問い合わせを歓迎します。",
  email: CONTACT_EMAIL,
};
