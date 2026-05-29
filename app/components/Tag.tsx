import { ReactNode } from "react";

/** 技術スタックやカテゴリを示す小さなピル（枠線のみの控えめなスタイル）。 */
export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[color:var(--muted)]">
      {children}
    </span>
  );
}
