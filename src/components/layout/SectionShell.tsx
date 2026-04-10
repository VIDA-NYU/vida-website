import type { ReactNode } from "react";

export type PageTheme = "default" | "visualization" | "people" | "research" | "publications" | "projects";

const THEME_CONFIG: Record<PageTheme, { eyebrowColor: string; accentGradient: string; glowColor: string }> = {
  default: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
  visualization: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
  people: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
  research: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
  publications: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
  projects: {
    eyebrowColor: "text-zinc-600 dark:text-zinc-400",
    accentGradient: "from-zinc-400/50 via-zinc-400/10 to-transparent",
    glowColor: "bg-zinc-200/30 dark:bg-zinc-800/30",
  },
};

type SectionShellProps = {
  title: string;
  eyebrow?: string;
  theme?: PageTheme;
  children?: ReactNode;
};

export function SectionShell({ title, eyebrow, theme = "default", children }: SectionShellProps) {
  const config = THEME_CONFIG[theme];
  
  return (
    <section className="relative space-y-6">
      <header className="relative space-y-1">
        {eyebrow ? (
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${config.eyebrowColor}`}>
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 sm:text-3xl">
          {title}
        </h1>
        {/* Accent line */}
        <div className={`mt-3 h-0.5 w-16 rounded-full bg-gradient-to-r ${config.accentGradient}`} />
      </header>
      {children ? <div className="relative space-y-4 text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">{children}</div> : null}
    </section>
  );
}
