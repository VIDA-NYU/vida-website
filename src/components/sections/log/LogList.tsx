import { SectionShell } from "@/components/layout/SectionShell";
import type { LogEntry } from "@/lib/log";
import Link from "next/link";

type Props = {
  entries: LogEntry[];
};

export function LogList({ entries }: Props) {
  return (
    <SectionShell title="Log" eyebrow="News & Updates">
      <p>
        Short posts about releases, talks, visitors, and milestones. This is a
        mock log using MDX files so updates can be added over time.
      </p>
      <div className="mt-6 space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.slug}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {entry.kind}
                </p>
                <h2 className="text-sm font-semibold tracking-tight text-zinc-50">
                  {entry.title}
                </h2>
              </div>
              <p className="whitespace-nowrap text-[11px] text-zinc-400">
                {entry.date}
              </p>
            </div>
            {entry.summary ? (
              <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                {entry.summary}
              </p>
            ) : null}
            <div className="mt-3 flex items-center gap-2 text-[11px]">
              {entry.link ? (
                <Link
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-sky-500 px-2.5 py-0.5 font-medium text-zinc-950 transition-colors hover:bg-sky-400"
                >
                  Details
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
