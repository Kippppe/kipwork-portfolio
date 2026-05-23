import { brand, nav } from "../lib/content";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          {brand.name}
          <span className="ml-2 hidden text-sm font-normal text-stone-500 sm:inline">
            {brand.role}
          </span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
