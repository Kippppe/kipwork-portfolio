import { hero } from "../lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-stone-200"
    >
      {/* 背景の淡いグラデーション */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-teal-50/60 via-background to-background"
      />
      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 sm:py-32">
        <p className="mb-5 inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium tracking-wide text-teal-800">
          {hero.eyebrow}
        </p>

        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl md:text-5xl md:leading-[1.15]">
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
          {hero.subhead}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {hero.proof.map((p) => (
            <li
              key={p}
              className="rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm font-medium text-stone-700 shadow-sm"
            >
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={hero.primaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-teal-700 px-7 text-base font-semibold text-white transition-colors hover:bg-teal-800"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-base font-semibold text-stone-800 transition-colors hover:border-stone-400 hover:bg-stone-50"
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
