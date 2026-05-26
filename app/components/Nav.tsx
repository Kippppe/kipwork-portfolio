"use client";

import { brand, nav } from "../lib/content";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(10,10,10,0.0)", "rgba(10,10,10,0.7)"]);
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(14px)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      style={{
        backgroundColor: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        borderBottom: "1px solid",
        borderBottomColor: border,
      }}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-display flex items-center gap-2 text-lg font-bold tracking-tight text-[color:var(--foreground)]"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-base">
            {brand.initials}
          </span>
          <span className="hidden text-sm font-medium text-[color:var(--muted)] sm:inline">
            kipwork
          </span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--foreground)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
