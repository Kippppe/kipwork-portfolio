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
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
