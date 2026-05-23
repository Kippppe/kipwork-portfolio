import { about } from "../lib/content";

export default function About() {
  return (
    <section id="about" className="border-b border-stone-200">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
          {about.eyebrow}
        </p>
        <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          {about.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-stone-600">
          {about.lead}
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {about.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold text-stone-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
