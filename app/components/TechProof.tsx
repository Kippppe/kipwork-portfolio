import { techProof } from "../lib/content";
import ShotImage from "./ShotImage";

// Lighthouse 風スコアドーナツ。値で色を出し分け（≥90 緑 / 50-89 橙 / <50 赤）。
function ScoreDonut({ label, value }: { label: string; value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const color =
    value >= 90 ? "#0cce6b" : value >= 50 ? "#ffa400" : "#ff4e42";
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24" role="img" aria-label={`${label} ${value}`}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e7e5e4" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
        />
        <text
          x="40"
          y="40"
          dominantBaseline="central"
          textAnchor="middle"
          className="fill-stone-900 font-bold"
          style={{ fontSize: "22px" }}
        >
          {value}
        </text>
      </svg>
      <span className="mt-2 text-sm font-semibold text-stone-700">{label}</span>
    </div>
  );
}

// hreflang 構造図（ハブ&スポーク）。中心＝各ページ、周囲＝6ロケールを相互リンク。
function HreflangDiagram({ locales }: { locales: string[] }) {
  const cx = 320;
  const cy = 130;
  const left = 116;
  const right = 524;
  const ys = [46, 130, 214];
  const pos = [
    { x: left, y: ys[0] },
    { x: left, y: ys[1] },
    { x: left, y: ys[2] },
    { x: right, y: ys[0] },
    { x: right, y: ys[1] },
    { x: right, y: ys[2] },
  ];
  return (
    <svg
      viewBox="0 0 640 260"
      className="h-auto w-full"
      role="img"
      aria-label="hreflang 相互リンク構造図"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fill-stone-400" />
        </marker>
      </defs>

      {pos.map((p, i) => (
        <line
          key={`l-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          className="stroke-stone-300"
          strokeWidth="1.5"
          markerStart="url(#arrow)"
          markerEnd="url(#arrow)"
        />
      ))}

      {/* 中心ハブ */}
      <g>
        <rect x={cx - 56} y={cy - 22} width="112" height="44" rx="10" className="fill-teal-700" />
        <text
          x={cx}
          y={cy}
          dominantBaseline="central"
          textAnchor="middle"
          className="fill-white font-semibold"
          style={{ fontSize: "14px" }}
        >
          各ページ
        </text>
      </g>

      {/* ロケールノード */}
      {locales.map((loc, i) => {
        const p = pos[i];
        return (
          <g key={loc}>
            <rect
              x={p.x - 52}
              y={p.y - 18}
              width="104"
              height="36"
              rx="8"
              className="fill-white stroke-stone-300"
              strokeWidth="1.5"
            />
            <text
              x={p.x}
              y={p.y}
              dominantBaseline="central"
              textAnchor="middle"
              className="fill-stone-800 font-mono"
              style={{ fontSize: "13px" }}
            >
              {loc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TechProof() {
  const { eyebrow, title, lead, schema, hreflang, metrics } = techProof;
  const star = schema.pages.find((p) => p.star);
  const rest = schema.pages.filter((p) => !p.star);

  return (
    <section id="proof" className="border-b border-stone-200 bg-stone-50/60">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">{lead}</p>

        {/* ───────── Schema（主役） ───────── */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-stone-900">{schema.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{schema.body}</p>

          {/* 数値サマリ（スクショが無くても証拠が成立する） */}
          <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200">
            {schema.pages.map((p) => (
              <div key={p.path} className="bg-white p-4 text-center">
                <div className="font-mono text-xs text-stone-500">{p.path}</div>
                <div className="mt-1 text-2xl font-bold text-stone-900">{p.count}</div>
                <div className="text-[11px] leading-4 text-stone-500">{p.highlight}</div>
              </div>
            ))}
          </div>

          {/* スクショ：/room を主役に大きく、残り2枚を下段 */}
          {star && (
            <figure className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-stone-100 bg-teal-50/70 px-4 py-2.5">
                <span className="rounded-full bg-teal-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                  主役
                </span>
                <span className="font-mono text-sm font-semibold text-stone-800">
                  {star.path}
                </span>
                <span className="text-xs text-stone-600">
                  {star.count} 件検出 · {star.highlight}
                </span>
              </div>
              <ShotImage
                src={star.img}
                alt={`validator.schema.org ${star.path} の検出結果（${star.count}件・エラー0警告0）`}
              />
            </figure>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((p) => (
              <figure
                key={p.path}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
              >
                <div className="flex items-center gap-2 border-b border-stone-100 px-4 py-2.5">
                  <span className="font-mono text-sm font-semibold text-stone-800">
                    {p.path}
                  </span>
                  <span className="text-xs text-stone-600">
                    {p.count} 件 · {p.highlight}
                  </span>
                </div>
                <ShotImage
                  src={p.img}
                  alt={`validator.schema.org ${p.path} の検出結果（${p.count}件・エラー0警告0）`}
                />
              </figure>
            ))}
          </div>

          <p className="mt-4 text-xs leading-6 text-stone-500">{schema.caption}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {schema.verify.map((v) => (
              <a
                key={v.href}
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
              >
                {v.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-500">{schema.self}</p>
        </div>

        {/* ───────── hreflang + Lighthouse ───────── */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* hreflang */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">{hreflang.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{hreflang.body}</p>

            <div className="mt-5">
              <HreflangDiagram locales={hreflang.locales} />
            </div>

            <pre className="mt-5 overflow-x-auto rounded-xl bg-stone-900 p-4 text-[12.5px] leading-6 text-stone-100">
              <code className="font-mono">{hreflang.code}</code>
            </pre>
          </div>

          {/* Lighthouse: SEO / Best Practices のみ */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">{metrics.title}</h3>
            <div className="mt-6 flex items-start justify-center gap-8">
              {metrics.items.map((m) => (
                <ScoreDonut key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-stone-500">{metrics.note}</p>
            <p className="mt-2 text-[11px] text-stone-400">{metrics.target}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
