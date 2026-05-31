"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";
import { splitGraphemes } from "../lib/text";

export type HeadlineVariant = {
  lang: string;
  text: string;
  hreflang: string;
};

type Props = {
  variants: HeadlineVariant[];
  dwell?: number; // 各言語の表示秒数
  swap?: number;  // 切替アニメ秒数
  /** 現在の variant が変わるたびにコールバック（hreflang ラベル同期用） */
  onChange?: (v: HeadlineVariant) => void;
  className?: string;
};

/**
 * 5言語の見出しを文字単位で glitch swap して循環。
 * サイト自身が hreflang を「演じる」自己言及演出。
 * - ホバー中は循環停止（読みたい人が読める）
 * - prefers-reduced-motion 時は静的表示＋クロスフェードのみ
 */
export default function MultilingualHeadline({
  variants,
  dwell = 2.6,
  swap = 0.55,
  onChange,
  className = "",
}: Props) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    onChange?.(variants[i]);
  }, [i, onChange, variants]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % variants.length);
    }, dwell * 1000);
    return () => clearInterval(id);
  }, [dwell, paused, variants.length]);

  const current = variants[i];
  const chars = splitGraphemes(current.text);

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // 循環アニメは装飾。SR には安定した意味（先頭=英語表記）を一度だけ伝え、
      // aria-live は付けない（2.6秒ごとの再読み上げノイズを防ぐ）。
      aria-label={variants[0]?.text ?? current.text}
    >
      {/* レイアウト崩れ防止：最長言語幅を占有する不可視テキスト */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {variants.reduce((a, b) => (a.text.length > b.text.length ? a : b)).text}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current.lang}
          aria-hidden
          className="absolute inset-0 inline-flex items-center whitespace-nowrap"
          initial={reduce ? { opacity: 0 } : undefined}
          animate={reduce ? { opacity: 1 } : undefined}
          exit={reduce ? { opacity: 0 } : undefined}
          transition={{ duration: swap, ease: EASE_OUT }}
        >
          {chars.map((c, ci) => (
            <motion.span
              key={`${current.lang}-${ci}-${c}`}
              className="inline-block"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { y: "100%", opacity: 0, filter: "blur(10px)" }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : { y: "0%", opacity: 1, filter: "blur(0px)" }
              }
              exit={
                reduce
                  ? { opacity: 0 }
                  : { y: "-100%", opacity: 0, filter: "blur(10px)" }
              }
              transition={{
                duration: swap,
                delay: reduce ? 0 : ci * 0.022,
                ease: EASE_OUT,
              }}
              style={{ whiteSpace: c === " " ? "pre" : "normal" }}
            >
              {c}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
