"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
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
   * whileInView は IntersectionObserver 依存で、何らかの理由で発火しないと
   * initial の opacity:0 のまま不可視になり得る。ヒーローでは false を渡して回避する。
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
  // reduced-motion 時は transform 系アニメをスキップ。
  // 文字は overflow-hidden で隠れたままにならないよう初期位置を 0 にする。
  const reduce = useReducedMotion();

  // inView=false の時はマウント時 animate、true の時は whileInView + viewport。
  const reveal = (to: TargetAndTransition, transition: Transition) =>
    inView
      ? { whileInView: to, viewport: { once: true, amount: 0.4 } as const, transition }
      : { animate: to, transition };

  return (
    <Tag className={className}>
      {lines.map((line, li) => {
        const isAccent = highlight && line.includes(highlight);
        if (byLine) {
          return (
            <motion.span
              key={li}
              className={`block overflow-hidden ${isAccent ? "text-[color:var(--accent)]" : ""}`}
              initial={{ opacity: 0 }}
              {...reveal({ opacity: 1 }, { duration: 0.6, delay: li * lineStagger, ease: EASE_OUT })}
            >
              <motion.span
                className="inline-block"
                initial={{ y: reduce ? "0%" : "110%" }}
                {...reveal({ y: "0%" }, { duration: 0.9, delay: li * lineStagger, ease: EASE_OUT })}
              >
                {line}
              </motion.span>
            </motion.span>
          );
        }
        const chars = splitGraphemes(line);
        return (
          <span key={li} className="block">
            {chars.map((c, ci) => (
              <motion.span
                key={ci}
                className={`inline-block ${isAccent ? "text-[color:var(--accent)]" : ""}`}
                initial={{ y: reduce ? "0%" : "100%", opacity: 0 }}
                {...reveal(
                  { y: "0%", opacity: 1 },
                  {
                    duration: 0.6,
                    delay: li * lineStagger + ci * charStagger,
                    ease: EASE_OUT,
                  },
                )}
                style={{ whiteSpace: c === " " ? "pre" : "normal" }}
              >
                {c}
              </motion.span>
            ))}
          </span>
        );
      })}
      {children}
    </Tag>
  );
}
