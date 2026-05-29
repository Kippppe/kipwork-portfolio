"use client";

import { connect, social } from "../lib/content";
import { Mail, ArrowUpRight } from "lucide-react";
import { XBrandIcon, GitHubIcon, LinkedInIcon, NoteIcon } from "./SocialIcons";
import FadeIn from "./FadeIn";
import { motion } from "framer-motion";
import { SVGProps, ComponentType } from "react";
import { SPRING_SNAP } from "../lib/motion";

type IconCmp = ComponentType<SVGProps<SVGSVGElement>>;

export default function Connect() {
  const links = [
    social.x && { href: social.x, label: "X / Twitter", Icon: XBrandIcon as IconCmp },
    social.github && { href: social.github, label: "GitHub", Icon: GitHubIcon as IconCmp },
    social.note && { href: social.note, label: "note", Icon: NoteIcon as IconCmp },
    social.linkedin && { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon as IconCmp },
  ].filter(Boolean) as { href: string; label: string; Icon: IconCmp }[];

  return (
    <section
      id="connect"
      className="relative overflow-hidden border-t border-white/5 px-6 py-32 sm:py-48"
    >
      {/* グロー（indigo 体系で統一） */}
      <div className="glow-orb left-[10%] top-[20%] h-[420px] w-[420px] bg-[radial-gradient(circle_at_center,#5e6ad2_0%,transparent_60%)]" />
      <div className="glow-orb right-[5%] bottom-[10%] h-[460px] w-[460px] bg-[radial-gradient(circle_at_center,#8b5cf6_0%,transparent_60%)]" />
      <div aria-hidden className="absolute inset-0 bg-noise" />

      <div className="relative mx-auto w-full max-w-6xl text-center">
        <FadeIn>
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            {connect.eyebrow}
          </p>
        </FadeIn>

        {/* グリッチ巨大テキスト */}
        <FadeIn delay={0.1}>
          <a
            href={`mailto:${connect.email}`}
            className="glitch-hover relative inline-block"
            data-cursor="link"
          >
            <h2 className="font-display relative text-[clamp(3rem,16vw,12rem)] font-bold leading-[0.9] tracking-tighter text-[color:var(--foreground)]">
              {connect.bigText}
              {/* グリッチ用ゴーストレイヤー */}
              <span
                aria-hidden
                className="glitch-layer-1 pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:opacity-90"
              >
                {connect.bigText}
              </span>
              <span
                aria-hidden
                className="glitch-layer-2 pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:opacity-90"
              >
                {connect.bigText}
              </span>
            </h2>
          </a>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            {connect.lead}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <motion.a
            href={`mailto:${connect.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={SPRING_SNAP}
            className="mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-[color:var(--foreground)] px-8 text-base font-semibold text-[color:var(--background)] transition-shadow hover:shadow-[0_8px_50px_rgba(237,237,237,0.25)]"
          >
            <Mail className="h-4 w-4" />
            {connect.email}
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </FadeIn>

        {links.length > 0 && (
          <FadeIn delay={0.4}>
            <ul className="mt-12 flex justify-center gap-3">
              {links.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group grid h-12 w-12 place-items-center rounded-full border border-white/15 text-[color:var(--muted)] transition-[color,border-color,transform] duration-200 ease-[var(--ease-out)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] active:scale-95"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
