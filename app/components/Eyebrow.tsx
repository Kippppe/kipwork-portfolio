import { ReactNode } from "react";

/**
 * セクション見出しの上に付くラベル。
 * アクセントの短い罫線 ＋ 全大文字・広めトラッキング。
 * children に PlaceholderBadge など補助要素も並べられる（flex/gap-3）。
 */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--muted)] ${className}`}
    >
      <span aria-hidden className="inline-block h-px w-8 bg-[color:var(--accent)]" />
      {children}
    </p>
  );
}
