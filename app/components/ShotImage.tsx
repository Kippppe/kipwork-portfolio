"use client";

import { useState } from "react";

// validator スクショ表示。画像が未配置/404でも壊れアイコンを出さず、
// 検証結果（エラー0・警告0）のフォールバックに切り替える。
export default function ShotImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="flex items-center justify-center gap-1.5 px-4 py-9 text-center text-xs text-stone-400">
        <span aria-hidden className="text-teal-600">
          ✓
        </span>
        validator.schema.org — エラー0 / 警告0（スクリーンショット準備中）
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
