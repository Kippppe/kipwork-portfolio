"use client";

import { useState } from "react";

export default function ShotImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 px-4 py-12 text-center">
        <span aria-hidden className="text-3xl leading-none text-[color:var(--accent)]">✓</span>
        <span className="text-sm font-semibold text-[color:var(--foreground)]">エラー 0 / 警告 0</span>
        <span className="text-[11px] text-[color:var(--muted)]">validator.schema.org で検証</span>
      </div>
    );
  }

  return (
    /* スクショは縦横比が画像ごとに不定のため next/image(fill) ではなく img + 遅延読込で対応 */
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full opacity-90"
      onError={() => setErr(true)}
    />
  );
}
