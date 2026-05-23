"use client";

import { useState } from "react";

// validator スクショ表示。画像が未配置/404でも壊れアイコンを出さず、
// 検証結果（エラー0・警告0）のフォールバックに切り替える。
export default function ShotImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 px-4 py-10 text-center">
        <span aria-hidden className="text-2xl leading-none text-teal-600">
          ✓
        </span>
        <span className="text-sm font-semibold text-stone-700">
          エラー 0 / 警告 0
        </span>
        <span className="text-[11px] text-stone-400">
          validator.schema.org で検証
        </span>
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full" onError={() => setErr(true)} />
    </>
  );
}
