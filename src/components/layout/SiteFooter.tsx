import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/90 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row md:items-center md:justify-between md:px-6 md:py-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">
            VIDA - Visualization Imaging & Data Analysis
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
            <Image
              src="/assets/NYUTandon_ShortLogo_White.png"
              alt="NYU Tandon"
              width={80}
              height={24}
              className="h-5 w-auto dark:brightness-100 brightness-0"
            />
            NYU Tandon School of Engineering
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/newsletter"
            className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-100 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
          >
            Newsletter
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-purple-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
