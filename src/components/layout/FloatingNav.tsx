"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { primaryNav, moreNav } from "@/config/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Show floating nav after scrolling past header
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("[data-floating-nav]")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isVisible) return null;

  const allNav = [...primaryNav, ...moreNav.slice(0, 2)];

  return (
    <div data-floating-nav className="fixed left-4 top-4 z-50">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-md backdrop-blur-md transition-all duration-300 ${
          isOpen
            ? "border-zinc-400 bg-zinc-900 text-white shadow-zinc-900/25 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-500"
            : "border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 hover:shadow-lg"
        }`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
      >
        <div className="relative h-5 w-5">
          {/* Hamburger icon lines */}
          <span
            className={`absolute left-0 top-0.5 h-0.5 w-5 rounded-full transition-all duration-300 ${
              isOpen ? "top-2 rotate-45 bg-white" : "bg-current"
            }`}
          />
          <span
            className={`absolute left-0 top-2 h-0.5 w-5 rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0" : "bg-current"
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full transition-all duration-300 ${
              isOpen ? "top-2 -rotate-45 bg-white" : "bg-current"
            }`}
          />
        </div>
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <nav
          className="absolute left-0 top-16 w-56 origin-top-left animate-in fade-in slide-in-from-top-2 duration-200 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-3 shadow-md backdrop-blur-md"
          role="menu"
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Navigation
            </p>
            <ThemeToggle />
          </div>
          
          <div className="space-y-1">
            {allNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                  role="menuitem"
                >
                  {item.label}
                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick links */}
          <div className="mt-3 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <div className="flex gap-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 py-2 text-center text-xs font-semibold text-white dark:text-zinc-900 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                Contact
              </Link>
              <Link
                href="/newsletter"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-center text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Newsletter
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
