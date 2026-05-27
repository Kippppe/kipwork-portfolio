"use client";

import { FileEdit } from "lucide-react";

/**
 * 編集ポイントを示す浮遊バッジ。
 * `editPath` を渡すと、どのファイルのどこを編集すれば良いかが分かる。
 * 例: <PlaceholderBadge editPath="content.ts → experience.items[1]" />
 *
 * 本番に出ても情報的価値があるが、商用デプロイ時に隠したい場合は
 * NEXT_PUBLIC_HIDE_PLACEHOLDERS=1 を設定。
 */
export default function PlaceholderBadge({
  editPath,
  label = "編集",
  className = "",
}: {
  editPath: string;
  label?: string;
  className?: string;
}) {
  if (process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS === "1") return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[color:var(--accent)] backdrop-blur ${className}`}
      title={`${label}: ${editPath}`}
    >
      <FileEdit className="h-3 w-3" />
      <span className="font-mono normal-case tracking-normal">{editPath}</span>
    </span>
  );
}
