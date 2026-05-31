"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT } from "../lib/motion";
import { splitGraphemes } from "../lib/text";

type Props = {
  lines: string[]; // 1行ずつ
  className?: string;
  /** 各文字の遅延。日本語は単位を文字、英語も文字単位（grapheme）。 */
  charStagger?: number;
  /** 行ごとの追加遅延。 */
  lineStagger?: number;
  /** 文字単位ではなく行単位で動かす（日本語向け）。 */
  byLine?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  highlight?: string; // この文字列を含むトークンだけアクセント色に
  /**
   * true（既定）: スクロールで viewport に入った時に発火（whileInView）。
   * false: マウント時に即発火（animate）。ファーストビューの見出しに使う。
   */
  inView?: boolean;
  children?: ReactNode;
};

export default function AnimatedHeading({
  lines,
  className = "",
  charStagger = 0.018,
  lineStagger = 0.12,
  byLine = false,
  as: Tag = "h1",
  highlight,
  inView = true,
  children,
}: Props) {
  // reduced-motion 時は transform 系アニメをスキップ（初期位置を 0 にして
  // overflow-hidden で隠れたままにならないようにする）。
  const reduce = useReducedMotion();

  // トリガー（＝アニメ状態 "hidden"→"show" の切替）は「クリップされない」
  // 親要素に付ける。子（文字／行の内側 span）は variant 継承で動かし、
  // 子自身には observer を付けない。
  //   - 旧実装は内側 span に whileInView を付けていたが、内側 span は
  //     initial の translateY で親の overflow-hidden の外へ出るため
  //     IntersectionObserver が交差 0% と判定し永久に発火しないデッドロックがあった。
  //   - 親は変位しないので whileInView / animate が確実に発火する。
  // inView=true: スクロールで入った時（whileInView）。
  // inView=false: マウント時に即発火（animate）。
  const trigger = inView
    ? {
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.4 },
      }
    : { initial: "hidden" as const, animate: "show" as const };

  return (
    <Tag className={className}>
      {lines.map((line, li) => {
        const isAccent = highlight && line.includes(highlight);
        if (byLine) {
          const outer: Variants = {
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { duration: 0.6, delay: li * lineStagger, ease: EASE_OUT },
            },
          };
          const inner: Variants = {
            hidden: { y: reduce ? "0%" : "110%" },
            show: {
              y: "0%",
              transition: { duration: 0.9, delay: li * lineStagger, ease: EASE_OUT },
            },
          };
          return (
            <motion.span
              key={li}
              className={`block overflow-hidden ${isAccent ? "text-[color:var(--accent)]" : ""}`}
              variants={outer}
              {...trigger}
            >
              <motion.span className="inline-block" variants={inner}>
                {line}
              </motion.span>
            </motion.span>
          );
        }
        const chars = splitGraphemes(line);
        return (
          <motion.span key={li} className="block" {...trigger}>
            {chars.map((c, ci) => {
              const charV: Variants = {
                hidden: { y: reduce ? "0%" : "100%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: li * lineStagger + ci * charStagger,
                    ease: EASE_OUT,
                  },
                },
              };
              return (
                <motion.span
                  key={ci}
                  className={`inline-block ${isAccent ? "text-[color:var(--accent)]" : ""}`}
                  variants={charV}
                  style={{ whiteSpace: c === " " ? "pre" : "normal" }}
                >
                  {c}
                </motion.span>
              );
            })}
          </motion.span>
        );
      })}
      {children}
    </Tag>
  );
}
