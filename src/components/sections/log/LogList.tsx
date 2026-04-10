import { SectionShell } from "@/components/layout/SectionShell";
import type { LogEntry } from "@/lib/log";
import Image from "next/image";
import Link from "next/link";

type Props = {
  entries: LogEntry[];
};

function NewsBlock({ entry, layoutType, className = "" }: { entry: LogEntry; layoutType: "hero" | "sidebar" | "standard" | "wide"; className?: string }) {
  const hasImage = !!entry.image;
  const dateStr = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (layoutType === "hero") {
    return (
      <Link href={`/news/${entry.slug}`} className={`group flex flex-col h-full ${className}`}>
        {hasImage && (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-video mb-5 overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-sm">
            <Image src={entry.image!} alt={entry.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
        )}
        <div className="flex items-center gap-2 mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{entry.kind}</span>
          <span>—</span>
          <span>{dateStr}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {entry.title}
        </h3>
        {entry.summary && (
          <p className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed font-serif line-clamp-4">
            {entry.summary}
          </p>
        )}
      </Link>
    );
  }

  if (layoutType === "sidebar") {
    return (
      <Link href={`/news/${entry.slug}`} className={`group flex flex-col py-6 ${className}`}>
        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{entry.kind}</span>
          <span>—</span>
          <span>{dateStr}</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {entry.title}
        </h3>
        {entry.summary && (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-4 font-serif">
            {entry.summary}
          </p>
        )}
      </Link>
    );
  }

  if (layoutType === "standard") {
    return (
      <Link href={`/news/${entry.slug}`} className={`group flex flex-col h-full ${className}`}>
        {hasImage && (
          <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-sm">
            <Image src={entry.image!} alt={entry.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">{entry.kind}</span>
          <span>—</span>
          <span>{dateStr}</span>
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {entry.title}
        </h3>
        {entry.summary && (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 font-serif">
            {entry.summary}
          </p>
        )}
      </Link>
    );
  }

  if (layoutType === "wide") {
    return (
      <Link href={`/news/${entry.slug}`} className={`group flex flex-col sm:flex-row gap-6 ${className}`}>
        {hasImage && (
          <div className="relative w-full sm:w-2/5 aspect-[4/3] shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-sm">
            <Image src={entry.image!} alt={entry.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center py-2">
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{entry.kind}</span>
            <span>—</span>
            <span>{dateStr}</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {entry.title}
          </h3>
          {entry.summary && (
            <p className="text-zinc-600 dark:text-zinc-400 text-base line-clamp-3 font-serif">
              {entry.summary}
            </p>
          )}
        </div>
      </Link>
    );
  }

  return null;
}

export function LogList({ entries }: Props) {
  // Chunk the entries into arrays of 8 for our repeating newspaper layout
  const CHUNK_SIZE = 8;
  const chunkedEntries: LogEntry[][] = [];
  for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
    chunkedEntries.push(entries.slice(i, i + CHUNK_SIZE));
  }

  return (
    <SectionShell title="The VIDA Gazette" eyebrow="Latest News & Updates">
      {/* Newspaper header aesthetic */}
      <div className="border-y-4 border-double border-zinc-900 dark:border-zinc-100 py-3 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
        <span>Vol. 1 — Data Science & Visualization</span>
        <span className="font-bold text-zinc-900 dark:text-zinc-100">NYU Tandon School of Engineering</span>
        <span>Est. 2024</span>
      </div>

      <div className="flex flex-col gap-16 w-full mx-auto">
        {chunkedEntries.map((chunk, chunkIdx) => (
          <div key={chunkIdx} className="flex flex-col gap-10 border-b-8 border-zinc-900 dark:border-zinc-100 pb-16 last:border-0 last:pb-0">
            
            {/* Row 1: Hero (Span 8) + Sidebar (Span 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
              <div className="lg:col-span-8 lg:pr-8 lg:border-r border-zinc-300 dark:border-zinc-800">
                {chunk[0] && <NewsBlock entry={chunk[0]} layoutType="hero" />}
              </div>
              <div className="lg:col-span-4 lg:pl-8 flex flex-col justify-start">
                <div className="divide-y divide-zinc-300 dark:divide-zinc-800">
                  {chunk[1] && <NewsBlock entry={chunk[1]} layoutType="sidebar" className="first:pt-0" />}
                  {chunk[2] && <NewsBlock entry={chunk[2]} layoutType="sidebar" />}
                </div>
              </div>
            </div>

            {/* Row 2: 3 Standard Columns */}
            {(chunk[3] || chunk[4] || chunk[5]) && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t-2 border-zinc-900 dark:border-zinc-100 pt-8">
                <div className="md:border-r border-zinc-300 dark:border-zinc-800 md:pr-6">
                  {chunk[3] && <NewsBlock entry={chunk[3]} layoutType="standard" />}
                </div>
                <div className="md:px-6">
                  {chunk[4] && <NewsBlock entry={chunk[4]} layoutType="standard" />}
                </div>
                <div className="md:pl-6 md:border-l border-zinc-300 dark:border-zinc-800">
                  {chunk[5] && <NewsBlock entry={chunk[5]} layoutType="standard" />}
                </div>
              </div>
            )}

            {/* Row 3: 2 Wide Columns */}
            {(chunk[6] || chunk[7]) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-t border-zinc-300 dark:border-zinc-800 pt-8">
                <div>{chunk[6] && <NewsBlock entry={chunk[6]} layoutType="wide" />}</div>
                <div>{chunk[7] && <NewsBlock entry={chunk[7]} layoutType="wide" />}</div>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
