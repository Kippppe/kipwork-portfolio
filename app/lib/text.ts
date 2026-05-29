/**
 * grapheme 単位で文字列を分割（CJK・Latin・絵文字対応）。
 * Intl.Segmenter があれば使用、なければ素朴な配列化へフォールバック。
 * 文字ごとアニメで「結合文字が割れる」事故を防ぐための共通ヘルパー。
 */
export function splitGraphemes(s: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const Seg = (
      Intl as unknown as {
        Segmenter: new (
          l: string,
          o: object,
        ) => { segment: (s: string) => Iterable<{ segment: string }> };
      }
    ).Segmenter;
    return Array.from(new Seg("ja", { granularity: "grapheme" }).segment(s), (g) => g.segment);
  }
  return Array.from(s);
}
