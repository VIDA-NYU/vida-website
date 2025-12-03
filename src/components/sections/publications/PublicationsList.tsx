"use client";

import { SectionShell } from "@/components/layout/SectionShell";
import type { Publication } from "@/lib/publications";
import Link from "next/link";
import { useMemo, useState } from "react";

// Tag to theme color mapping for visual variety
const TAG_THEMES: Record<string, { bg: string; icon: string; accent: string }> = {
  "visualization": { bg: "from-sky-600 to-cyan-500", icon: "📊", accent: "sky" },
  "urban-data": { bg: "from-emerald-600 to-teal-500", icon: "🏙️", accent: "emerald" },
  "machine-learning": { bg: "from-violet-600 to-purple-500", icon: "🤖", accent: "violet" },
  "medical-imaging": { bg: "from-rose-600 to-pink-500", icon: "🧠", accent: "rose" },
  "reproducibility": { bg: "from-amber-600 to-orange-500", icon: "🔄", accent: "amber" },
  "fairness": { bg: "from-indigo-600 to-blue-500", icon: "⚖️", accent: "indigo" },
  "data-management": { bg: "from-slate-600 to-zinc-500", icon: "📁", accent: "slate" },
  "automl": { bg: "from-fuchsia-600 to-pink-500", icon: "⚡", accent: "fuchsia" },
  "sports": { bg: "from-green-600 to-lime-500", icon: "⚽", accent: "green" },
  "deep-learning": { bg: "from-red-600 to-orange-500", icon: "🧬", accent: "red" },
  "public-health": { bg: "from-teal-600 to-cyan-500", icon: "🏥", accent: "teal" },
  "explainability": { bg: "from-yellow-600 to-amber-500", icon: "💡", accent: "yellow" },
  "neuroimaging": { bg: "from-pink-600 to-rose-500", icon: "🧠", accent: "pink" },
  "spatial-data": { bg: "from-blue-600 to-indigo-500", icon: "🗺️", accent: "blue" },
  "gpu": { bg: "from-green-600 to-emerald-500", icon: "💻", accent: "green" },
  "ranking": { bg: "from-orange-600 to-red-500", icon: "📈", accent: "orange" },
};

const DEFAULT_THEME = { bg: "from-zinc-600 to-zinc-500", icon: "📄", accent: "zinc" };

function getPublicationTheme(tags: string[]) {
  for (const tag of tags) {
    if (TAG_THEMES[tag]) return TAG_THEMES[tag];
  }
  return DEFAULT_THEME;
}

function PublicationIcon({ publication }: { publication: Publication }) {
  const theme = getPublicationTheme(publication.tags);
  
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${theme.bg} text-2xl shadow-lg`}>
      {theme.icon}
    </div>
  );
}

type Props = {
  publications: Publication[];
};

function groupByYear(publications: Publication[]): Record<number, Publication[]> {
  return publications.reduce<Record<number, Publication[]>>((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});
}

export function PublicationsList({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  const allYears = useMemo(() => {
    const years = Array.from(new Set(publications.map((p) => p.year)));
    return years.sort((a, b) => b - a);
  }, [publications]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    publications.forEach((p) => {
      p.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [publications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      if (yearFilter !== "all" && pub.year.toString() !== yearFilter) return false;
      if (kindFilter !== "all" && pub.kind !== kindFilter) return false;
      if (tagFilter !== "all" && !pub.tags.includes(tagFilter as typeof pub.tags[number])) return false;

      if (!q) return true;

      const haystack = [
        pub.title,
        pub.venue ?? "",
        pub.authors.join(" "),
        pub.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [publications, query, yearFilter, kindFilter, tagFilter]);

  const groups = groupByYear(filtered);
  const years = Object.keys(groups)
    .map((y) => Number(y))
    .sort((a, b) => b - a);

  const totalCount = publications.length;
  const filteredCount = filtered.length;

  return (
    <SectionShell title="Publications" eyebrow="Research Output" theme="publications">
      <p className="text-zinc-600 dark:text-zinc-400">
        Selected publications from the lab, organized by year. Use the search
        and filters to quickly find relevant work.
      </p>

      {/* Search and filters */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-purple-500/20 bg-white dark:bg-gradient-to-r dark:from-purple-950/30 dark:via-zinc-950 dark:to-zinc-950">
        <div className="border-b border-zinc-200 dark:border-purple-500/10 bg-zinc-50 dark:bg-purple-500/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search publications by title, author, venue, or tag..."
              className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
            />
            <span className="rounded-full bg-purple-100 dark:bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:text-purple-300">
              {filteredCount} results
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 p-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Year</span>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-50 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All</option>
              {allYears.map((year) => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Type</span>
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-50 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="paper">Papers</option>
              <option value="preprint">Preprints</option>
              <option value="talk">Talks</option>
              <option value="thesis">Theses</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Topic</span>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-50 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          {(yearFilter !== "all" || kindFilter !== "all" || tagFilter !== "all" || query) && (
            <button
              onClick={() => {
                setYearFilter("all");
                setKindFilter("all");
                setTagFilter("all");
                setQuery("");
              }}
              className="ml-auto text-[11px] font-medium text-purple-600 dark:text-purple-400 hover:text-purple-500"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Publications timeline */}
      <div className="mt-8 space-y-8">
        {years.map((year) => (
          <section key={year} className="relative">
            {/* Year marker */}
            <div className="sticky top-16 z-10 mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-purple-500/25">
                {year.toString().slice(-2)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-50">{year}</h2>
                <p className="text-xs text-zinc-500">{groups[year].length} publications</p>
              </div>
            </div>
            
            {/* Publications list */}
            <div className="ml-6 space-y-3 border-l-2 border-purple-200 dark:border-purple-500/20 pl-6">
              {groups[year].map((pub) => {
                const theme = getPublicationTheme(pub.tags);
                return (
                  <article
                    key={pub.slug}
                    className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 transition-all duration-200 hover:border-purple-300 dark:hover:border-purple-500/40 hover:shadow-md"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-purple-300 dark:border-purple-500/50 bg-white dark:bg-zinc-950" />
                    
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${theme.bg} text-xl shadow-md sm:flex`}>
                        {theme.icon}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <Link href={`/publications/${pub.slug}`} className="block">
                          <h3 className="font-semibold leading-snug text-zinc-800 dark:text-zinc-50 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                            {pub.title}
                          </h3>
                        </Link>
                        {pub.authors.length > 0 && (
                          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            {pub.authors.join(", ")}
                          </p>
                        )}
                        {pub.venue && (
                          <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-purple-600 dark:text-purple-400/80">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                            {pub.venue}
                          </p>
                        )}
                        
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {pub.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400"
                            >
                              {tag}
                            </span>
                          ))}
                          <Link
                            href={`/publications/${pub.slug}`}
                            className="ml-auto inline-flex items-center gap-1 rounded-full bg-purple-500 px-3 py-1 text-[11px] font-semibold text-white transition-all hover:bg-purple-400"
                          >
                            View details
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center">
          <p className="text-zinc-500">No publications found matching your criteria.</p>
        </div>
      )}
    </SectionShell>
  );
}
