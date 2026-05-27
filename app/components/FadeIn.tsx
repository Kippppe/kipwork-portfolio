"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number; // viewport 検知量 0..1
  once?: boolean;
};

/**
 * 下から fade-in。
 * - duration 0.6s / ease easeOut
 * - prefers-reduced-motion 時は静的表示
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  className = "",
  amount = 0.3,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  // reduced-motion 時は initial={false} で最終状態を即描画（whileInView 非依存）。
  // SSR/hydration をまたいでも確実に可視化され、コンテンツが隠れない。
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={reduce ? undefined : { once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
