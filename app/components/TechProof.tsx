"use client";

import { techProof } from "../lib/content";
import ShotImage from "./ShotImage";
import FadeIn from "./FadeIn";
import Eyebrow from "./Eyebrow";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

function ScoreDonut({ label, value }: { label: string; value: number }) {
  const reduce = useReducedMotion();
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24" role="img" aria-label={`${label} ${value}`}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? c * (1 - value / 100) : c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
          transform="rotate(-90 40 40)"
        />
        <text
          x="40"
          y="40"
          dominantBaseline="central"
          textAnchor="middle"
          className="font-display fill-[color:var(--foreground)] font-bold tabular"
          style={{ fontSize: "22px" }}
        >
          {value}
        </text>
      </svg>
      <span className="mt-2 text-xs uppercase tracking-widest text-[color:var(--muted)]">{label}</span>
    </div>
  );
}

function HreflangDiagram({ locales }: { locales: string[] }) {
  const reduce = useReducedMotion();
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
    <svg viewBox="0 0 640 260" className="h-auto w-full" role="img" aria-label="hreflang 相互リンク構造図">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
      {pos.map((p, i) => (
        <motion.line
          key={`l-${i}`}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          markerStart="url(#arrow)"
          markerEnd="url(#arrow)"
          initial={{ pathLength: reduce ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.1 + i * 0.07 }}
        />
      ))}
      <g>
        <rect x={cx - 56} y={cy - 22} width="112" height="44" rx="10" fill="var(--accent)" />
        <text x={cx} y={cy} dominantBaseline="central" textAnchor="middle" fill="#ffffff" className="font-semibold" style={{ fontSize: "13px" }}>
          各ページ
        </text>
      </g>
      {locales.map((loc, i) => {
        const p = pos[i];
        return (
          <g key={loc}>
            <rect x={p.x - 52} y={p.y - 18} width="104" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <text x={p.x} y={p.y} dominantBaseline="central" textAnchor="middle" fill="rgba(237,237,237,0.9)" className="font-mono" style={{ fontSize: "12.5px" }}>
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
    <section id="proof" className="relative border-t border-white/5 px-6 py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <FadeIn>
          <Eyebrow>{eyebrow}</Eyebrow>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">{lead}</p>
        </FadeIn>

        {/* Schema */}
        <div className="mt-16">
          <FadeIn>
            <h3 className="font-display text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">{schema.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[color:var(--foreground)]/80">{schema.body}</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
              {schema.pages.map((p) => (
                <div key={p.path} className="bg-[color:var(--background)] p-5 text-center">
                  <div className="font-mono text-xs text-[color:var(--muted)]">{p.path}</div>
                  <div className="font-display mt-2 text-3xl font-bold text-[color:var(--accent)] tabular">{p.count}</div>
                  <div className="mt-1 text-[11px] leading-4 text-[color:var(--muted)]">{p.highlight}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {star && (
            <FadeIn delay={0.15}>
              <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
                  <span className="rounded-full bg-[color:var(--accent)] px-2 py-0.5 text-[11px] font-semibold text-white">主役</span>
                  <span className="font-mono text-sm font-semibold text-[color:var(--foreground)]">{star.path}</span>
                  <span className="text-xs text-[color:var(--muted)]">{star.count} 件検出 · {star.highlight}</span>
                </div>
                <ShotImage src={star.img} alt={`validator.schema.org ${star.path} の検出結果`} />
              </figure>
            </FadeIn>
          )}

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.map((p, i) => (
              <FadeIn key={p.path} delay={0.05 * i}>
                <figure className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                    <span className="font-mono text-sm font-semibold text-[color:var(--foreground)]">{p.path}</span>
                    <span className="text-xs text-[color:var(--muted)]">{p.count} 件 · {p.highlight}</span>
                  </div>
                  <ShotImage src={p.img} alt={`validator.schema.org ${p.path} の検出結果`} />
                </figure>
              </FadeIn>
            ))}
          </div>

          <p className="mt-4 text-xs leading-6 text-[color:var(--muted)]">{schema.caption}</p>

          <FadeIn delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-3">
              {schema.verify.map((v) => (
                <a
                  key={v.href}
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[color:var(--foreground)] transition-[color,border-color,transform] duration-200 ease-[var(--ease-out)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] active:scale-[0.98]"
                >
                  {v.label}
                  <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-[color:var(--muted)]">{schema.self}</p>
          </FadeIn>
        </div>

        {/* hreflang + Lighthouse */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <FadeIn>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-bold text-[color:var(--foreground)]">{hreflang.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/80">{hreflang.body}</p>
              <div className="mt-6">
                <HreflangDiagram locales={hreflang.locales} />
              </div>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-white/5 bg-[#06080c] p-4 text-[12.5px] leading-6 text-[color:var(--foreground)]/90">
                <code className="font-mono">{hreflang.code}</code>
              </pre>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="font-display text-xl font-bold text-[color:var(--foreground)]">{metrics.title}</h3>
              <div className="mt-8 flex items-start justify-center gap-10">
                {metrics.items.map((m) => (
                  <ScoreDonut key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
              <p className="mt-6 text-xs leading-6 text-[color:var(--muted)]">{metrics.note}</p>
              <p className="mt-2 text-[11px] text-[color:var(--muted)]/70">{metrics.target}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
