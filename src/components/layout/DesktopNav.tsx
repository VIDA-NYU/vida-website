"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import type { NavItem } from "@/config/navigation";
import { primaryNav, moreNav } from "@/config/navigation";

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 md:text-sm
        ${
          isActive
            ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
        }
      `}
    >
      {item.label}
    </Link>
  );
}

export function DesktopNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    if (moreOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreOpen]);

  return (
    <nav className="hidden items-center gap-3 lg:flex">
      {primaryNav.map((item) => (
        <NavLink key={item.href} item={item} />
      ))}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          aria-haspopup="menu"
          aria-expanded={moreOpen}
        >
          More
          <span className="ml-1 text-xs">▾</span>
        </button>
        {moreOpen && (
          <div
            className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-zinc-200 bg-white/90 p-1 text-sm shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90"
            role="menu"
          >
            {moreNav.map((item) => (
              <div key={item.href} className="px-1 py-0.5">
                <NavLink item={item} onClick={() => setMoreOpen(false)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
