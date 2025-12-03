"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-sm transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Sun icon - show in dark mode */}
      <svg
        className={`h-4 w-4 transition-all ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      {/* Moon icon - show in light mode */}
      <svg
        className={`absolute h-4 w-4 transition-all ${theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
