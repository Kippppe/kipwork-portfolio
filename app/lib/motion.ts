import type { Transition } from "framer-motion";

// 共有モーション定数。コンポーネント全体で同じ質感を保つための単一情報源。

/** 強めの decel カーブ（標準CSSのeaseより効く）。fade/slide 系で共通利用。 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** hover / tap の即応スプリング（ボタン・カード・カーソル共通）。 */
export const SPRING_SNAP: Transition = { type: "spring", stiffness: 400, damping: 30 };
