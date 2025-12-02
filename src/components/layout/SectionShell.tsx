import type { ReactNode } from "react";

type SectionShellProps = {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
};

export function SectionShell({ title, eyebrow, children }: SectionShellProps) {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          {title}
        </h1>
      </header>
      {children ? <div className="space-y-4 text-sm text-zinc-300 sm:text-base">{children}</div> : null}
    </section>
  );
}
