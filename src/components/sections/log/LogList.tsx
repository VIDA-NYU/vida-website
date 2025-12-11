import { SectionShell } from "@/components/layout/SectionShell";
import type { LogEntry } from "@/lib/log";
import Image from "next/image";
import Link from "next/link";

type Props = {
  entries: LogEntry[];
};

const KIND_CONFIG: Record<string, { color: string; bgColor: string; icon: string }> = {
  event: { color: "text-violet-400", bgColor: "bg-violet-500/20", icon: "📅" },
  news: { color: "text-sky-400", bgColor: "bg-sky-500/20", icon: "📰" },
  release: { color: "text-emerald-400", bgColor: "bg-emerald-500/20", icon: "🚀" },
  talk: { color: "text-amber-400", bgColor: "bg-amber-500/20", icon: "🎤" },
  visit: { color: "text-rose-400", bgColor: "bg-rose-500/20", icon: "👥" },
  publication: { color: "text-cyan-400", bgColor: "bg-cyan-500/20", icon: "📄" },
};

export function LogList({ entries }: Props) {
  return (
    <SectionShell title="News & Updates" eyebrow="Log">
      <p>
        Latest news about releases, talks, awards, and milestones from the VIDA lab.
      </p>
      <div className="mt-6 space-y-3">
        {entries.map((entry, index) => {
          const config = KIND_CONFIG[entry.kind] || KIND_CONFIG.news;
          const hasImage = !!entry.image;
          
          return (
            <article
              key={entry.slug}
              className="group flex gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 p-4 shadow-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
            >
              {/* Thumbnail or placeholder */}
              {hasImage ? (
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={entry.image!}
                    alt={entry.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className={`flex h-20 w-28 shrink-0 items-center justify-center rounded-xl ${config.bgColor} border border-zinc-200 dark:border-zinc-700/50`}>
                  <div className="text-center">
                    <span className="text-2xl">{config.icon}</span>
                    <p className={`mt-1 text-[9px] font-semibold uppercase tracking-wider ${config.color}`}>
                      {entry.kind}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${config.bgColor} ${config.color}`}>
                      {entry.kind}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  
                  <Link href={`/news/${entry.slug}`}>
                    <h2 className="mt-1 text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors line-clamp-1">
                      {entry.title}
                    </h2>
                  </Link>
                  
                  {entry.summary && (
                    <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-400">
                      {entry.summary}
                    </p>
                  )}
                </div>
                
                <Link
                  href={`/news/${entry.slug}`}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 self-start"
                >
                  Read more
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
