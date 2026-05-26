"use client";

import { about } from "../lib/content";
import FadeIn from "./FadeIn";
import AnimatedHeading from "./AnimatedHeading";
import { useState } from "react";

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="about" className="relative border-t border-white/5 px-6 py-32 sm:py-40">
      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <FadeIn>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              <span className="mr-3 inline-block h-px w-8 align-middle bg-[color:var(--accent)]" />
              {about.eyebrow}
            </p>
          </FadeIn>

          <AnimatedHeading
            as="h2"
            lines={about.title.split("\n")}
            byLine
            lineStagger={0.1}
            className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-[color:var(--foreground)] sm:text-4xl md:text-5xl"
          />

          <div className="mt-10 space-y-5">
            {about.body.map((p, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <p className="text-base leading-8 text-[color:var(--foreground)]/85">
                  {p}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-10">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Skills
            </p>
            <ul className="flex flex-wrap gap-2">
              {about.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[color:var(--foreground)]/85"
                >
                  {s}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="md:col-span-5">
          <FadeIn delay={0.15}>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent">
              {imgOk ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={about.portrait}
                  alt="portrait"
                  onError={() => setImgOk(false)}
                  className="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[color:var(--muted)]">
                    <div className="font-display text-[8rem] leading-none opacity-30">K</div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em]">
                      /public/me.jpg を配置すると表示
                    </p>
                  </div>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--background)] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-xs text-[color:var(--muted)]">
                <span className="font-display text-base text-[color:var(--foreground)]">kip</span>
                <span>Asakusa, Tokyo</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
