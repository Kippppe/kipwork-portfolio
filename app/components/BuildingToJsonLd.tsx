"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Eyebrow from "./Eyebrow";

/**
 * スクロール連動：ホテル建物 SVG → JSON-LD コードへの morph。
 * 「物理ホテルを構造化データに翻訳する」というサービス中核を視覚化。
 *
 * 設計:
 *  - 外側 section: height = 260svh（sticky pin の余地を作る）
 *  - 内側 sticky div: h = 100svh, top-0 で pin
 *  - useScroll の offset = ["start start", "end end"]
 *    → progress 0 = section top が viewport top に到達（pin開始）
 *    → progress 1 = section bottom が viewport bottom に到達（pin終了）
 *    sticky の pin 範囲と progress 0〜1 が一致するので、animation milestones が
 *    sticky pin 中の体感とぴったり同期する。
 *  - prefers-reduced-motion 時は scroll 連動をやめ、建物＋全ラベル＋完成 JSON-LD を
 *    静的に同時表示（「物理ホテル → 構造化データ」の対応を動きなしで伝える）。
 *    260svh/sticky は Tailwind の motion-reduce: で解除し、軽い opacity フェードのみ付与。
 *  - NEXT_PUBLIC_DEBUG=1 で右上に progress 値の HUD を表示（検証用）。
 *  - モバイル（< md）は sticky を解除して通常スクロール表示（高さが足りないため）。
 */

const codeLines = [
  { t: `{`,                                                              k: "open" },
  { t: `  "@context": "https://schema.org",`,                            k: "ctx" },
  { t: `  "@type": "Hotel",`,                                            k: "type" },
  { t: `  "name": "BOUTIQUE HOTEL",`,                               k: "name" },
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
  reduced,
}: {
  line: { t: string; k: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // 0.18 で開始 → 0.85 で完了する区間に行ごとの stagger を均等配分
  const span = 0.62;
  const startBase = 0.18;
  const start = startBase + (index / total) * span;
  const end = Math.min(start + 0.07, 0.95);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-12, 0]);
  // reduce-motion: 全行を静的にフル表示（stagger / スライドなし）
  return (
    <motion.div
      style={reduced ? { opacity: 1, x: 0 } : { opacity, x }}
      className="whitespace-pre font-mono text-[12px] leading-6 text-[color:var(--foreground)]/90 sm:text-[13px]"
    >
      {syntaxHighlight(line.t)}
    </motion.div>
  );
}

function syntaxHighlight(s: string) {
  const parts: { t: string; cls: string }[] = [];
  const re = /("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?|true|false|null|[{}\[\],])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) parts.push({ t: s.slice(last, m.index), cls: "" });
    const tok = m[0];
    let cls = "";
    if (/^".*":/.test(tok)) cls = "text-[#82aaff]";
    else if (/^".*"$/.test(tok)) cls = "text-[#c3e88d]";
    else if (/^-?\d/.test(tok)) cls = "text-[color:var(--accent)]";
    else if (/^(true|false|null)$/.test(tok)) cls = "text-[color:var(--accent)]";
    else cls = "text-[color:var(--muted)]";
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

function BuildingSvg({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  // 建物本体: 0.45-0.85 で fade out（label が完全に出てから消え始める）
  const bodyOpacity = useTransform(progress, [0.45, 0.85], [1, 0.06]);
  // ラベル群: 0.08 でフェードイン開始 → 0.22 完了 → 0.78-0.92 でフェードアウト
  const labelOpacity = useTransform(progress, [0.08, 0.22, 0.78, 0.92], [0, 1, 1, 0]);

  return (
    <motion.svg
      viewBox="0 0 400 480"
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="ホテル建物の構造化データへの翻訳"
    >
      <motion.g style={{ opacity: reduced ? 1 : bodyOpacity }} stroke="rgba(237,237,237,0.85)" strokeWidth="1.4" fill="none">
        {/* 屋根サイン */}
        <rect x="100" y="40" width="200" height="34" rx="2" />
        <text x="200" y="63" textAnchor="middle" fill="rgba(237,237,237,0.9)" stroke="none" className="font-display" textLength={180} lengthAdjust="spacingAndGlyphs" style={{ fontSize: "11px" }}>
          BOUTIQUE HOTEL
        </text>
        {/* 星 */}
        <g fill="var(--accent)" stroke="none">
          {[0, 1, 2, 3].map((i) => (
            <polygon
              key={i}
              points={star(140 + i * 30, 92, 5)}
            />
          ))}
          <polygon points={star(260, 92, 5)} fillOpacity="0.5" />
        </g>
        {/* 建物本体 */}
        <rect x="60" y="110" width="280" height="320" />
        {/* 窓グリッド */}
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

      <motion.g style={{ opacity: reduced ? 1 : labelOpacity }} fill="var(--accent)" stroke="none">
        <Label x={310} y={57}  text='name' anchorX={300} anchorY={57}  fromX={280} fromY={57} />
        <Label x={310} y={92}  text='starRating' anchorX={290} anchorY={92} fromX={272} fromY={92} />
        <Label x={300} y={212} text='numberOfRooms' anchorX={190} anchorY={212} fromX={190} fromY={212} />
        <Label x={310} y={395} text='makesOffer' anchorX={235} anchorY={395} fromX={235} fromY={395} />
        <Label x={300} y={470} text='address' anchorX={150} anchorY={465} fromX={150} fromY={465} />
        <Label x={310} y={130} text='@type: Hotel' anchorX={345} anchorY={130} fromX={345} fromY={130} />
      </motion.g>
    </motion.svg>
  );
}

function Label({
  x, y, text, anchorX, anchorY, fromX, fromY, align = "start",
}: {
  x: number; y: number; text: string;
  anchorX: number; anchorY: number;
  fromX: number; fromY: number;
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

function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return pts.join(" ");
}

/** デバッグHUD：scroll progress 値を表示。NEXT_PUBLIC_DEBUG=1 で有効化 */
function DebugHud({ progress }: { progress: MotionValue<number> }) {
  const [val, setVal] = useState(0);
  useMotionValueEvent(progress, "change", (v) => setVal(v));
  if (process.env.NEXT_PUBLIC_DEBUG !== "1") return null;
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] rounded-lg border border-[color:var(--accent)] bg-black/80 px-3 py-2 font-mono text-[11px] text-[color:var(--accent)] backdrop-blur">
      <div>progress: <span className="font-semibold">{val.toFixed(3)}</span></div>
      <div className="opacity-60">[start start, end end]</div>
    </div>
  );
}

/**
 * reduce-motion 時のみ、コンテナ単位で opacity だけの軽いフェードイン（動きなし）を付与。
 * 非 reduce 時は initial=false / whileInView なしで、素の div と同じ静的挙動になる
 * （= scroll morph 側に一切干渉しない）。要素タグは常に div なので再マウント/構造ミスマッチも無い。
 */
function ReduceFade({
  active,
  className,
  children,
}: {
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={active ? { opacity: 0 } : false}
      whileInView={active ? { opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function BuildingToJsonLd() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // 修正: pin開始（section top = viewport top）から pin終了（section bottom = viewport bottom）まで
    // を 0→1 にマップ。sticky pin 範囲と完全一致する。
    offset: ["start start", "end end"],
  });

  // reduce-motion 判定（true のとき子コンポーネントに静的フル表示を指示）。
  const reduced = reduce === true;
  // progress は常に scroll 連動 MV。reduced 時は子側で参照せず opacity を直接固定する。
  const progress = scrollYProgress;

  return (
    <section
      ref={ref}
      id="translation"
      className="relative border-t border-white/5"
      // モバイルではsticky演出を出さず通常表示にして高さを縮める。
      // md以上では 260svh でsticky pin の余地を確保。
      style={{ minHeight: "100svh" }}
    >
      {/* モバイル用の通常レイアウト（mdからは hidden） */}
      <ReduceFade active={reduced} className="block px-6 py-24 md:hidden">
        <SectionHeader />
        <div className="mt-10 flex justify-center">
          <BuildingSvg progress={progress} reduced={reduced} />
        </div>
        <div className="mt-10">
          <CodeBlock progress={progress} reduced={reduced} />
        </div>
        <p className="mt-6 text-center text-xs text-[color:var(--muted)] motion-reduce:hidden">
          ※ デスクトップではスクロール連動アニメ
        </p>
      </ReduceFade>

      {/* デスクトップ用：scroll-linked + sticky（reduce 時は motion-reduce: で pin/余白を解除して静的表示） */}
      <div className="hidden h-[260svh] md:block motion-reduce:h-auto">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:py-24">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
          <div aria-hidden className="absolute inset-0 bg-noise" />

          <ReduceFade active={reduced} className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16">
            <div className="md:col-span-2">
              <SectionHeader />
            </div>
            <div className="flex items-center justify-center">
              <BuildingSvg progress={progress} reduced={reduced} />
            </div>
            <div className="flex items-center">
              <CodeBlock progress={progress} reduced={reduced} />
            </div>
          </ReduceFade>

          {/* 進捗バー（reduce 時は非表示） */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-[color:var(--accent)] motion-reduce:hidden"
            style={{ scaleX: progress }}
          />
        </div>
      </div>

      <DebugHud progress={progress} />
    </section>
  );
}

function SectionHeader() {
  return (
    <>
      <Eyebrow>The Translation</Eyebrow>
      <h2 className="font-display text-2xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-3xl md:text-4xl">
        物理ホテルを、検索が読める構造に翻訳する。
      </h2>
    </>
  );
}

function CodeBlock({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  return (
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
            reduced={reduced}
          />
        ))}
      </div>
    </div>
  );
}
