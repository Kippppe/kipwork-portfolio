"use client";

import { hero } from "../lib/content";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import MultilingualHeadline, { HeadlineVariant } from "./MultilingualHeadline";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";

export default function Hero() {
  const [current, setCurrent] = useState<HeadlineVariant>(hero.headlineCycle[0]);
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* グロー球（indigo 体系で統一） */}
      <div className="glow-orb left-[-10%] top-[10%] h-[480px] w-[480px] bg-[radial-gradient(circle_at_center,#5e6ad2_0%,transparent_60%)]" />
      <div className="glow-orb right-[-5%] top-[20%] h-[520px] w-[520px] bg-[radial-gradient(circle_at_center,#8b5cf6_0%,transparent_60%)]" />
      <div className="glow-orb left-[30%] bottom-[-10%] h-[420px] w-[420px] bg-[radial-gradient(circle_at_center,#4f46e5_0%,transparent_60%)]" />

      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          {hero.eyebrow}
        </motion.div>

        {/* 見出し1行目：英語固定 */}
        <AnimatedHeading
          as="h1"
          lines={[hero.headlineEn[0]]}
          byLine
          lineStagger={0}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-[color:var(--foreground)]"
        />

        {/* 見出し2行目：5言語循環（self-referential hreflang） */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display relative text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-[color:var(--accent)]"
        >
          <MultilingualHeadline
            variants={hero.headlineCycle}
            dwell={hero.cycleDwell}
            swap={hero.cycleSwap}
            onChange={setCurrent}
          />
        </motion.div>

        {/* 見出し3行目：英語固定 */}
        <div className="mt-2">
          <AnimatedHeading
            as="div"
            lines={[hero.headlineEn[2]]}
            byLine
            lineStagger={0}
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-[color:var(--foreground)]"
          />
        </div>

        {/* hreflang ラベル：現在の言語と同期 */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/5 px-3 py-1.5 font-mono text-[11px] text-[color:var(--accent)]/90"
        >
          <span className="text-[color:var(--muted)]">{"<link"}</span>
          <span>rel=&quot;alternate&quot;</span>
          <span className="text-[color:var(--accent)]">
            hreflang=&quot;
            <motion.span
              key={current.hreflang}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block font-semibold"
            >
              {current.hreflang}
            </motion.span>
            &quot;
          </span>
          <span className="text-[color:var(--muted)]">{"/>"}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
          className="mt-8 max-w-2xl text-base leading-8 text-[color:var(--foreground)]/85 sm:text-lg"
        >
          {hero.headlineJa}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
          className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base"
        >
          {hero.subhead}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {hero.proof.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.06 }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[color:var(--foreground)]/80"
            >
              {p}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE_OUT }}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={hero.primaryCta.href}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 text-sm font-semibold text-white transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(94,106,210,0.45)] active:scale-[0.97]"
          >
            {hero.primaryCta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-7 text-sm font-semibold text-[color:var(--foreground)] transition-[transform,background-color] duration-200 ease-[var(--ease-out)] hover:bg-white/[0.04] active:scale-[0.97]"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[color:var(--muted)]"
      >
        <span>scroll</span>
        <span className="scroll-hint inline-block h-8 w-px overflow-hidden bg-white/10">
          <span className="block h-full w-px bg-[color:var(--accent)]" />
        </span>
        <ArrowDown className="h-3 w-3" />
      </motion.div>
    </section>
  );
}
