"use client";

import { hero } from "../lib/content";
import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* グロー球 */}
      <div className="glow-orb left-[-10%] top-[10%] h-[480px] w-[480px] bg-[radial-gradient(circle_at_center,#ff4d6d_0%,transparent_60%)]" />
      <div className="glow-orb right-[-5%] top-[20%] h-[520px] w-[520px] bg-[radial-gradient(circle_at_center,#7c4dff_0%,transparent_60%)]" />
      <div className="glow-orb left-[30%] bottom-[-10%] h-[420px] w-[420px] bg-[radial-gradient(circle_at_center,#ff6b35_0%,transparent_60%)]" />

      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          {hero.eyebrow}
        </motion.div>

        <AnimatedHeading
          as="h1"
          lines={hero.headlineEn}
          byLine
          lineStagger={0.14}
          highlight="multilingual hotel sites"
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-[color:var(--foreground)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-base leading-8 text-[color:var(--foreground)]/85 sm:text-lg"
        >
          {hero.headlineJa}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base"
        >
          {hero.subhead}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {hero.proof.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.06 }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[color:var(--foreground)]/80"
            >
              {p}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={hero.primaryCta.href}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-7 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(255,77,109,0.45)]"
          >
            {hero.primaryCta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-7 text-sm font-semibold text-[color:var(--foreground)] transition-colors hover:bg-white/[0.04]"
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
