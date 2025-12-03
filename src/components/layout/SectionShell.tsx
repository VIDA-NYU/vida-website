import type { ReactNode } from "react";

export type PageTheme = "default" | "visualization" | "people" | "research" | "publications" | "projects";

const THEME_CONFIG: Record<PageTheme, { eyebrowColor: string; accentGradient: string; glowColor: string }> = {
  default: {
    eyebrowColor: "text-purple-600 dark:text-purple-300",
    accentGradient: "from-purple-500/30 via-transparent to-transparent",
    glowColor: "bg-purple-500/10",
  },
  visualization: {
    eyebrowColor: "text-purple-600 dark:text-purple-300",
    accentGradient: "from-purple-500/30 via-transparent to-transparent",
    glowColor: "bg-purple-500/10",
  },
  people: {
    eyebrowColor: "text-purple-600 dark:text-purple-300",
    accentGradient: "from-purple-500/30 via-transparent to-transparent",
    glowColor: "bg-purple-500/10",
  },
  research: {
    eyebrowColor: "text-green-600 dark:text-green-300",
    accentGradient: "from-green-500/30 via-transparent to-transparent",
    glowColor: "bg-green-500/10",
  },
  publications: {
    eyebrowColor: "text-purple-600 dark:text-purple-300",
    accentGradient: "from-purple-500/30 via-transparent to-transparent",
    glowColor: "bg-purple-500/10",
  },
  projects: {
    eyebrowColor: "text-green-600 dark:text-green-300",
    accentGradient: "from-green-500/30 via-transparent to-transparent",
    glowColor: "bg-green-500/10",
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
      {/* Subtle background glow */}
      <div className={`pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full ${config.glowColor} blur-3xl dark:opacity-100 opacity-50`} />
      
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
