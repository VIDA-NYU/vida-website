"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, moreNav } from "@/config/navigation";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden" onClick={onClose}>
      <nav
        className="absolute inset-x-3 top-3 mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/95 p-4 text-sm text-zinc-100 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Navigation
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-200 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            Close
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-2xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                    ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-200 hover:bg-zinc-900 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-2 space-y-1 border-t border-zinc-800 pt-2">
            {moreNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-2xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                    ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900"
                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
