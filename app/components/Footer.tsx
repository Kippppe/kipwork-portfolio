import { brand, CONTACT_EMAIL } from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-10 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-stone-700">{brand.name}</span> ——{" "}
          {brand.role}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="transition-colors hover:text-stone-900"
          >
            {CONTACT_EMAIL}
          </a>
          <span aria-hidden className="text-stone-300">
            |
          </span>
          <span>© {year} {brand.name}</span>
        </div>
      </div>
    </footer>
  );
}
