"use client";

import { experience } from "../lib/content";
import FadeIn from "./FadeIn";
import Eyebrow from "./Eyebrow";
import Tag from "./Tag";
import PlaceholderBadge from "./PlaceholderBadge";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

// sentinel判定：データが未差し替えかどうか
function isPlaceholder(period: string) {
  return /20XX/.test(period) || /（.*入力）/.test(period);
}

export default function Experience() {
  const reduce = useReducedMotion();
  return (
    <section id="experience" className="relative border-t border-white/5 px-6 py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <FadeIn>
          <Eyebrow>
            {experience.eyebrow}
            <PlaceholderBadge editPath="content.ts → experience.items" />
          </Eyebrow>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
            {experience.title}
          </h2>
        </FadeIn>

        <div className="relative mt-16 max-w-3xl">
          {/* 縦線 */}
          <motion.div
            initial={{ scaleY: reduce ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            style={{ transformOrigin: "top" }}
            className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-[color:var(--accent)] via-white/10 to-transparent"
          />

          <ul className="space-y-12">
            {experience.items.map((item, i) => (
              <li key={i} className="relative pl-12">
                {/* ノード */}
                <motion.span
                  initial={{ scale: reduce ? 1 : 0.4, opacity: reduce ? 1 : 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.1 + i * 0.1, ease: EASE_OUT }}
                  className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-[color:var(--background)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                </motion.span>

                <FadeIn delay={i * 0.05}>
                  <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] tabular">
                    {item.period}
                    {isPlaceholder(item.period) && (
                      <PlaceholderBadge editPath={`experience.items[${i}]`} label="未入力" />
                    )}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[color:var(--foreground)] sm:text-2xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{item.org}</p>
                  <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]/85">
                    {item.summary}
                  </p>
                  {item.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  )}
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
