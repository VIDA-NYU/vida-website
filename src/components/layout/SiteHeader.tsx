"use client";

import Link from "next/link";
import { useState } from "react";
import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 shadow-lg" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-zinc-50">
              VIDA Lab
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-400">
              Research
            </span>
          </div>
        </Link>
        <DesktopNav />
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-100 shadow-sm transition-colors hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          Menu
        </button>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
