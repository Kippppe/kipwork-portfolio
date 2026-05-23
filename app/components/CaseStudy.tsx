import { caseStudy } from "../lib/content";

export default function CaseStudy() {
  return (
    <section id="case" className="border-b border-stone-200 bg-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
          {caseStudy.eyebrow}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {caseStudy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
          {caseStudy.summary}
        </p>
        <a
          href={caseStudy.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
        >
          公開サイト: {caseStudy.liveLabel}
          <span aria-hidden>↗</span>
        </a>

        {/* スタッツ */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-5">
          {caseStudy.stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col bg-white p-5"
            >
              <dt className="order-2 mt-2 text-xs leading-5 text-stone-500">
                {s.label}
              </dt>
              <dd className="order-1 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                {s.value}
                <span className="ml-1 text-sm font-medium text-stone-500">
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        {/* 実装内容 + 検証 */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-lg font-semibold text-stone-900">
              {caseStudy.implementation.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {caseStudy.implementation.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-stone-700">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-teal-800">
              検証 / Validation
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {caseStudy.validation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
