import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-black/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between md:px-6 md:py-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            VIDA Research Lab
          </p>
          <p className="mt-1 text-xs md:text-sm">
            Visual, Interactive, and Data-driven Analytics for human-centered research.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/newsletter"
            className="inline-flex items-center rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-100 transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Newsletter
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1.5 text-xs font-semibold text-zinc-950 shadow-sm transition-colors hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
