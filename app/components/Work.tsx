"use client";

import { work, techProof } from "../lib/content";
import FadeIn from "./FadeIn";
import Eyebrow from "./Eyebrow";
import Tag from "./Tag";
import PlaceholderBadge from "./PlaceholderBadge";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { EASE_OUT, SPRING_SNAP } from "../lib/motion";

export default function Work() {
  return (
    <section id="work" className="relative border-t border-white/5 px-6 py-32 sm:py-40">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <FadeIn>
              <Eyebrow>
                {work.eyebrow}
                <PlaceholderBadge editPath="content.ts → work.projects" />
              </Eyebrow>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl">
                {work.title}
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <p className="hidden max-w-xs text-sm text-[color:var(--muted)] md:block">
              実装可能 ≠ 実装した。下記は実機・公開ソース・検証ツールで再現確認できる実績です。
            </p>
          </FadeIn>
        </div>

        {/* プロジェクト・グリッド */}
        <div className="grid gap-6 md:grid-cols-2">
          {work.projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}

          {/* 1件しかない場合のスペース埋め＋技術プルーフへの導線 */}
          {work.projects.length === 1 && (
            <FadeIn delay={0.2}>
              <a
                href="#proof"
                className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent p-8 transition-[border-color,transform] duration-300 ease-[var(--ease-out)] hover:border-[color:var(--accent)]/40 active:scale-[0.99]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    {techProof.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-bold text-[color:var(--foreground)] sm:text-3xl">
                    検証可能性で示す
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    Schema・hreflang・Lighthouse の全ての証拠を、第三者が再検証できる形で公開しています。
                  </p>
                </div>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
                  技術力の証拠を見る
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof work.projects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <FadeIn delay={index * 0.08}>
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        whileHover="hover"
        whileTap={{ scale: 0.99 }}
        transition={SPRING_SNAP}
      >
        {/* カバー画像 */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1a0e14] via-[#0f0f1a] to-[#0a1518]">
          {imgOk ? (
            <motion.div
              className="absolute inset-0"
              variants={{ hover: { scale: 1.06 } }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                onError={() => setImgOk(false)}
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display text-6xl font-bold text-white/10">
                {project.title.split(" ").map((w) => w[0]).join("")}
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--background)] via-[color:var(--background)]/30 to-transparent" />
          {/* 編集バッジ：カバー画像 */}
          <div className="absolute left-4 top-4 z-10">
            <PlaceholderBadge editPath={`public${project.cover}`} label="差し替え" />
          </div>
          {/* タイトル：ホバーでスライド上 */}
          <motion.div
            className="absolute bottom-5 left-5 right-5"
            variants={{ hover: { y: -4 } }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              {project.year} · {project.role}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-[color:var(--foreground)] sm:text-3xl">
              {project.title}
            </h3>
          </motion.div>
          <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-[color:var(--foreground)] opacity-60 transition-all group-hover:opacity-100 group-hover:rotate-12" />
        </div>

        {/* 下部メタ */}
        <div className="border-t border-white/5 p-6">
          <p className="text-sm leading-7 text-[color:var(--foreground)]/85">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 tabular">
            {project.stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="font-display text-xl font-bold text-[color:var(--accent)]">{s.value}</span>
                <span className="text-xs text-[color:var(--muted)]">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </motion.a>
    </FadeIn>
  );
}
