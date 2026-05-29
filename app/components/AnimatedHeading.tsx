"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  children,
}: Props) {
  // reduced-motion 時は transform 系アニメをスキップ。
  // 文字は overflow-hidden で隠れたままにならないよう初期位置を 0 にする。
  const reduce = useReducedMotion();

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
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: li * lineStagger, ease: EASE_OUT }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: reduce ? "0%" : "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: li * lineStagger, ease: EASE_OUT }}
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
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: li * lineStagger + ci * charStagger,
                  ease: EASE_OUT,
                }}
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
