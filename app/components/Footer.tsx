import { brand, CONTACT_EMAIL, nav } from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 bg-[color:var(--background)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-display font-semibold text-[color:var(--foreground)]">
            {brand.name}
          </span>
          <span className="ml-3 hidden sm:inline">— {brand.role}</span>
        </p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition-colors hover:text-[color:var(--foreground)]">
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-[color:var(--foreground)]"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="text-xs">© {year} {brand.name}</li>
        </ul>
      </div>
    </footer>
  );
}
