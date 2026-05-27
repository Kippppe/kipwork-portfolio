"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

/**
 * スクロール連動：ホテル建物 SVG → JSON-LD コードへの morph。
 * 「物理ホテルを構造化データに翻訳する」というサービス中核を視覚化。
 *
 * 構成:
 *  - sticky内側に2カラム（左:建物 / 右:コード）
 *  - scrollYProgress 0→1 に応じて建物の各パーツがラベル化→消失、
 *    コード行が順次書き込まれる
 *  - prefers-reduced-motion 時は静的に最終状態を表示
 */

// JSON-LD 行（実際の OTHER SPACE データに準拠）
const codeLines = [
  { t: `{`,                                                              k: "open" },
  { t: `  "@context": "https://schema.org",`,                            k: "ctx" },
  { t: `  "@type": "Hotel",`,                                            k: "type" },
  { t: `  "name": "OTHER SPACE Asakusa",`,                               k: "name" },
  { t: `  "starRating": { "ratingValue": "4.5" },`,                      k: "star" },
  { t: `  "numberOfRooms": 94,`,                                         k: "rooms" },
  { t: `  "address": {`,                                                 k: "addr-open" },
  { t: `    "@type": "PostalAddress",`,                                  k: "addr-type" },
  { t: `    "addressLocality": "Asakusa, Tokyo"`,                        k: "addr-city" },
  { t: `  },`,                                                           k: "addr-close" },
  { t: `  "makesOffer": { "@type": "Offer", "name": "Direct booking" }`, k: "offer" },
  { t: `}`,                                                              k: "close" },
];

function CodeLine({
  line,
  index,
  total,
  progress,
}: {
  line: { t: string; k: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // 0.3 で開始 → 1.0 で完了する区間に行ごとの stagger をマップ
  const start = 0.32 + (index / total) * 0.55;
  const end = start + 0.06;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-12, 0]);
  return (
    <motion.div
      style={{ opacity, x }}
      className="whitespace-pre font-mono text-[12px] leading-6 text-[color:var(--foreground)]/90 sm:text-[13px]"
    >
      {syntaxHighlight(line.t)}
    </motion.div>
  );
}

// 簡易シンタックスハイライト（JSON-LDキーと文字列・型を色分け）
function syntaxHighlight(s: string) {
  // 文字列 / キー / 数値 / 真偽 / 括弧
  const parts: { t: string; cls: string }[] = [];
  const re = /("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true|false|null|[{}\[\],])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) parts.push({ t: s.slice(last, m.index), cls: "" });
    const tok = m[0];
    let cls = "";
    if (/^".*":/.test(tok)) cls = "text-[#82aaff]"; // キー（indigo系ブルー）
    else if (/^".*"$/.test(tok)) cls = "text-[#c3e88d]"; // 文字列（ソフトグリーン）
    else if (/^-?\d/.test(tok)) cls = "text-[color:var(--accent)]"; // 数値
    else if (/^(true|false|null)$/.test(tok)) cls = "text-[color:var(--accent)]"; // 真偽
    else cls = "text-[color:var(--muted)]"; // 括弧
    parts.push({ t: tok, cls });
    last = m.index + tok.length;
  }
  if (last < s.length) parts.push({ t: s.slice(last), cls: "" });
  return parts.map((p, i) => (
    <span key={i} className={p.cls}>
      {p.t}
    </span>
  ));
}

// 建物SVGの各パーツに、対応する JSON-LD プロパティラベルを overlay
function BuildingSvg({ progress }: { progress: MotionValue<number> }) {
  // 建物本体の opacity（0.6-0.85 で消えていく）
  const bodyOpacity = useTransform(progress, [0.55, 0.95], [1, 0.06]);
  // ラベル群の opacity（0.15-0.35 でフェードイン → 0.7-0.9 でフェードアウト）
  const labelOpacity = useTransform(progress, [0.15, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <motion.svg
      viewBox="0 0 400 480"
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="ホテル建物の構造化データへの翻訳"
    >
      <motion.g style={{ opacity: bodyOpacity }} stroke="rgba(237,237,237,0.85)" strokeWidth="1.4" fill="none">
        {/* 屋根サイン */}
        <rect x="100" y="40" width="200" height="34" rx="2" />
        <text x="200" y="63" textAnchor="middle" fill="rgba(237,237,237,0.9)" stroke="none" className="font-display" style={{ fontSize: "13px", letterSpacing: "0.18em" }}>
          OTHER SPACE
        </text>
        {/* 星 */}
        <g fill="var(--accent)" stroke="none">
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points={star(140 + i * 30, 92, 5)}
            />
          ))}
          {/* 半星 */}
          <polygon points={star(260, 92, 5)} fillOpacity="0.5" />
        </g>
        {/* 建物本体 */}
        <rect x="60" y="110" width="280" height="320" />
        {/* 窓グリッド（3階×6列） */}
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <rect
              key={`w-${r}-${c}`}
              x={80 + c * 38}
              y={130 + r * 70}
              width="24"
              height="44"
              fill="rgba(94,106,210,0.10)"
            />
          ))
        )}
        {/* エントランス */}
        <rect x="170" y="350" width="60" height="80" />
        <line x1="200" y1="350" x2="200" y2="430" />
        {/* 地面 */}
        <line x1="20" y1="450" x2="380" y2="450" />
        {/* 住所マーカー */}
        <g transform="translate(60, 460)" fill="rgba(237,237,237,0.7)" stroke="none">
          <circle cx="0" cy="0" r="3" fill="var(--accent)" />
          <text x="10" y="4" style={{ fontSize: "11px" }} className="font-mono">
            Asakusa, Tokyo
          </text>
        </g>
      </motion.g>

      {/* プロパティラベル overlay：建物パーツ → JSON-LDプロパティ */}
      <motion.g style={{ opacity: labelOpacity }} fill="var(--accent)" stroke="none">
        <Label x={310} y={57}  text='name' anchorX={300} anchorY={57}  fromX={280} fromY={57} />
        <Label x={310} y={92}  text='starRating' anchorX={290} anchorY={92} fromX={272} fromY={92} />
        <Label x={50}  y={270} text='numberOfRooms: 94' anchorX={62} anchorY={270} fromX={62} fromY={270} align="end" />
        <Label x={310} y={395} text='makesOffer' anchorX={235} anchorY={395} fromX={235} fromY={395} />
        <Label x={300} y={470} text='address' anchorX={150} anchorY={465} fromX={150} fromY={465} />
        <Label x={310} y={130} text='@type: Hotel' anchorX={345} anchorY={130} fromX={345} fromY={130} />
      </motion.g>
    </motion.svg>
  );
}

function Label({
  x,
  y,
  text,
  anchorX,
  anchorY,
  fromX,
  fromY,
  align = "start",
}: {
  x: number;
  y: number;
  text: string;
  anchorX: number;
  anchorY: number;
  fromX: number;
  fromY: number;
  align?: "start" | "end";
}) {
  return (
    <g>
      <line x1={fromX} y1={fromY} x2={x} y2={y} stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2 2" />
      <circle cx={anchorX} cy={anchorY} r="2.5" />
      <text
        x={align === "end" ? x - 4 : x + 4}
        y={y + 4}
        textAnchor={align}
        className="font-mono"
        style={{ fontSize: "11px" }}
      >
        {text}
      </text>
    </g>
  );
}

// 星形のポイント生成（外接円半径 r）
function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return pts.join(" ");
}

export default function BuildingToJsonLd() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // reduce-motion 時は常に最終状態を見せる
  const fakeFull = useTransform(scrollYProgress, () => 1);
  const progress = reduce ? fakeFull : scrollYProgress;

  return (
    <section
      ref={ref}
      id="translation"
      className="relative border-t border-white/5"
      // 縦に長くしてスクロール尺を確保（sticky内側で演出展開）
      style={{ height: "260svh" }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* 背景：微グリッド + うっすらノイズ */}
        <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
        <div aria-hidden className="absolute inset-0 bg-noise" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16">
          {/* セクション見出し（上に置いて全体を支える） */}
          <div className="md:col-span-2">
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              <span className="inline-block h-px w-8 bg-[color:var(--accent)]" />
              The Translation
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl md:text-4xl">
              物理ホテルを、検索が読める構造に翻訳する。
            </h2>
          </div>

          {/* 左：建物 SVG */}
          <div className="flex items-center justify-center">
            <BuildingSvg progress={progress} />
          </div>

          {/* 右：JSON-LD コード */}
          <div className="flex items-center">
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#06080c]/90 p-5 backdrop-blur">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--muted)]">
                  application/ld+json
                </span>
              </div>
              <div className="space-y-0">
                {codeLines.map((line, i) => (
                  <CodeLine
                    key={line.k}
                    line={line}
                    index={i}
                    total={codeLines.length}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 進捗バー */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-[color:var(--accent)]"
          style={{ scaleX: progress }}
        />
      </div>
    </section>
  );
}
