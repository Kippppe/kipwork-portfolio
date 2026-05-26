"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
  // grapheme 単位で分割（絵文字対応）
  const splitChars = (s: string) =>
    typeof Intl !== "undefined" && "Segmenter" in Intl
      ? Array.from(
          new (Intl as unknown as { Segmenter: new (l: string, o: object) => { segment: (s: string) => Iterable<{ segment: string }> } }).Segmenter("ja", { granularity: "grapheme" }).segment(s),
          (g) => g.segment
        )
      : Array.from(s);

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
              transition={{ duration: 0.6, delay: li * lineStagger, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, delay: li * lineStagger, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </motion.span>
          );
        }
        const chars = splitChars(line);
        return (
          <span key={li} className="block">
            {chars.map((c, ci) => (
              <motion.span
                key={ci}
                className={`inline-block ${isAccent ? "text-[color:var(--accent)]" : ""}`}
                initial={{ y: "100%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: li * lineStagger + ci * charStagger,
                  ease: [0.22, 1, 0.36, 1],
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
