"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING_SNAP } from "../lib/motion";

/**
 * カスタムカーソル：
 * - 小さな円が実カーソル位置を追尾
 * - a / button / [data-cursor="link"] にホバーで拡大＋アクセント色
 * - prefers-reduced-motion 時は描画しない（CSS側でも cursor:auto に戻す）
 * - タッチデバイスは hover メディアクエリで非表示
 */
// useSyncExternalStoreでSSRセーフに media query を購読する。
function useMatchMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false, // SSR時はfalse
  );
}

export default function CustomCursor() {
  const hoverCapable = useMatchMedia("(hover: hover) and (pointer: fine)");
  const reduceMotion = useMatchMedia("(prefers-reduced-motion: reduce)");
  const enabled = hoverCapable && !reduceMotion;

  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('a, button, [data-cursor="link"]')) setHovered(true);
    };
    const out = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('a, button, [data-cursor="link"]')) setHovered(false);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: hovered ? 44 : 18,
            height: hovered ? 44 : 18,
            x: hovered ? -22 : -9,
            y: hovered ? -22 : -9,
            backgroundColor: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          }}
          transition={SPRING_SNAP}
        />
      </motion.div>
      {/* 中央のドット（hovered時に消える） */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
        animate={{ opacity: hovered ? 0 : 1 }}
      />
    </>
  );
}
